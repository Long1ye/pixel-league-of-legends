"""Free, offline architecture study. Run with Blender --background --python FILE.

Creates an editable source and GLB; never modifies runtime assets or starts an API job.
The downloaded lion is rendered separately for rejection/selection, never auto-adopted.
"""
import bpy
import math
import random
import json
from pathlib import Path
from mathutils import Vector
from mathutils.noise import noise_vector

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'assets/map-modules/howling-blender-prototype'
OUT.mkdir(parents=True, exist_ok=True)
random.seed(641)
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete(use_global=False)
scene = bpy.context.scene
scene.render.engine = 'CYCLES'
scene.cycles.samples = 32
scene.render.resolution_x = 1200
scene.render.resolution_y = 1000
scene.render.resolution_percentage = 100
scene.world.color = (.20, .25, .34)
scene.view_settings.view_transform = 'AgX'
scene.view_settings.look = 'AgX - Medium High Contrast'
scene.view_settings.exposure = -.65

def mat(name, color, roughness=.87, metallic=0):
    m = bpy.data.materials.new(name)
    m.diffuse_color = (*color, 1)
    m.use_nodes = True
    p = m.node_tree.nodes.get('Principled BSDF')
    p.inputs['Base Color'].default_value = (*color, 1)
    p.inputs['Roughness'].default_value = roughness
    p.inputs['Metallic'].default_value = metallic
    return m

stone = [mat('violet_slate_%02d' % i, (.205+i*.009, .225+i*.009, .29+i*.01)) for i in range(8)]
dark = mat('carved_recess', (.105, .135, .19))
trim = mat('worn_carving_edges', (.36, .395, .47))
snow = mat('cold_snow', (.72, .82, .91))
ice = mat('opaque_glacial_ice', (.34, .59, .77), .34)

def finish(o, material, bevel=0):
    o.data.materials.append(material)
    if bevel:
        b = o.modifiers.new('worn stone bevel', 'BEVEL')
        b.width = bevel
        b.segments = 2
        bpy.context.view_layer.objects.active = o
        bpy.ops.object.modifier_apply(modifier=b.name)
        n = o.modifiers.new('weighted corner normals', 'WEIGHTED_NORMAL')
        bpy.ops.object.modifier_apply(modifier=n.name)
    return o

def mesh(name, verts, faces, material, bevel=0):
    me = bpy.data.meshes.new(name)
    me.from_pydata(verts, [], faces)
    me.update()
    o = bpy.data.objects.new(name, me)
    scene.collection.objects.link(o)
    return finish(o, material, bevel)

def block(name, loc, scale, material=None, bevel=.035, chip=.018):
    bpy.ops.mesh.primitive_cube_add(size=1, location=loc)
    o = bpy.context.object
    o.name = name
    o.scale = scale
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    for v in o.data.vertices:
        v.co += Vector(tuple(random.uniform(-chip, chip) for _ in range(3)))
    return finish(o, material or random.choice(stone), bevel)

def ribbon(name, pts, radius=.025, material=trim):
    c = bpy.data.curves.new(name, 'CURVE')
    c.dimensions = '3D'
    c.resolution_u = 3
    c.bevel_depth = radius
    c.bevel_resolution = 1
    p = c.splines.new('BEZIER')
    p.bezier_points.add(len(pts)-1)
    for b, v in zip(p.bezier_points, pts):
        b.co = v
        b.handle_left_type = b.handle_right_type = 'AUTO'
    o = bpy.data.objects.new(name, c)
    scene.collection.objects.link(o)
    o.data.materials.append(material)
    bpy.ops.object.select_all(action='DESELECT')
    o.select_set(True)
    bpy.context.view_layer.objects.active = o
    bpy.ops.object.convert(target='MESH')
    return bpy.context.object

def cap(x, y, z, w, d, seed):
    rng = random.Random(seed)
    # A closed, shallow uneven blanket, with no planar alpha silhouette.
    n = 24
    verts = [(x, y, z+.055)]
    for k in range(n):
        a = k*2*math.pi/n
        ca, sa = math.cos(a), math.sin(a)
        # Superellipse follows a masonry cap without a rectangular snow slab.
        px = math.copysign(abs(ca)**.42, ca)*w*.5
        py = math.copysign(abs(sa)**.42, sa)*d*.5
        verts.append((x+px, y+py, z+rng.uniform(-.018, .025)))
    verts += [(vx, vy, vz-rng.uniform(.045, .115)) for vx, vy, vz in verts[1:]]
    faces = [(0, 1+k, 1+(k+1)%n) for k in range(n)]
    faces += [(1+k, 1+n+k, 1+n+(k+1)%n, 1+(k+1)%n) for k in range(n)]
    faces += [tuple(range(2*n, n, -1))]
    o = mesh('thin broken snow cap', verts, faces, snow, .018)
    for p in o.data.polygons: p.use_smooth = True
    for k in range(8):
        ix = x+rng.uniform(-w*.46, w*.46)
        length = rng.uniform(.12, .48)
        bpy.ops.mesh.primitive_cone_add(vertices=7, radius1=.003, radius2=rng.uniform(.018, .035), depth=length,
            location=(ix, y-d*.51, z-length*.5-.035))
        finish(bpy.context.object, ice)

# Bridge arch: separate radial voussoirs with a real open arch and deep side reveals.
radius, spring, thickness = 2.25, -2.55, .46
for k in range(19):
    a, b = k*math.pi/19+.006, (k+1)*math.pi/19-.006
    verts = []
    for yy in [-.48, .48]:
        for rr, angle in [(radius,a),(radius,b),(radius+thickness,b),(radius+thickness,a)]:
            verts.append((1.1+rr*math.cos(angle), yy, spring+rr*math.sin(angle)))
    mesh('radial arch stone %02d' % k, verts,
        [(0,3,2,1),(4,5,6,7),(0,1,5,4),(1,2,6,5),(2,3,7,6),(3,0,4,7)], random.choice(stone), .022)

# Continuous backing closes every spandrel gap, while leaving the arch open.
for k in range(28):
    a,b=k*math.pi/28,(k+1)*math.pi/28
    xa,za=1.1+(radius+thickness)*math.cos(a),spring+(radius+thickness)*math.sin(a)
    xb,zb=1.1+(radius+thickness)*math.cos(b),spring+(radius+thickness)*math.sin(b)
    verts=[(xa,y,za) for y in [-.43,.43]]+[(xb,y,zb) for y in [-.43,.43]]
    verts += [(xa,y,.22) for y in [-.43,.43]]+[(xb,y,.22) for y in [-.43,.43]]
    mesh('solid spandrel backing',verts,[(0,2,3,1),(4,5,7,6),(0,4,6,2),(1,3,7,5),(0,1,5,4),(2,6,7,3)],stone[1])

# Spandrel blocks conform to the extrados instead of filling the arch opening.
for row in range(7):
    z = -.17-row*.33
    for col in range(12):
        x = -1.58+col*.49+(row%2)*.245
        if x > 3.85: continue
        corners = [abs(x+dx-1.1) for dx in [-.23,.23]]
        r = radius+thickness
        high = max([spring+math.sqrt(max(0,r*r-d*d)) if d<r else spring for d in corners])
        if z-.15 > high+.015:
            block('spandrel masonry', (x,0,z), (.47,.92,.30), bevel=.018)

for x in [-1.65,3.85]:
    for row in range(12):
        block('load bearing pier', (x,0,-.25-row*.34), (.72,.99,.32), bevel=.024)

# Wall course, cap line and an ornate guardian pedestal. Statue deliberately absent.
for row in range(4):
    for col in range(11):
        x = -1.52+col*.49+(row%2)*.245
        if x>3.85 or (row>=2 and 1.2<x<2.0): continue
        block('parapet ashlar', (x,0,.22+row*.29), (.47,.52,.265), bevel=.024)
for i in range(11):
    x=-1.5+i*.5
    if 1.2<x<2: continue
    z=1.24 if x<1.2 or x>2 else .64
    block('wall coping', (x,0,z), (.48,.64,.14), bevel=.035)
    cap(x,0,z+.08,.5,.65,100+i)

for row in range(8):
    z=-.3+row*.34
    block('pedestal core', (-1.1,0,z), (1.15,.86,.32), bevel=.035)
    for side in [-1,1]:
        block('projecting carved pilaster', (-1.1+side*.51,-.49,z), (.16,.19,.32), bevel=.02)
block('pedestal lower plinth', (-1.1,0,-.45), (1.45,1.15,.20), bevel=.04)
block('guardian seat', (-1.1,0,2.35), (1.5,1.18,.24), bevel=.05)
cap(-1.1,0,2.49,1.52,1.2,84)
block('inset carving field', (-1.1,-.452,1.02), (.80,.045,1.78), dark,.025,0)

# Interlaced, modeled stone relief. Visible edge thickness at oblique angles.
for side in [-1,1]:
    pts=[]
    for k in range(33):
        t=k/32
        pts.append((-1.1+side*.27*math.sin(t*math.pi*3),-.493,.22+t*1.60))
    ribbon('interlaced stone relief',pts,.036)
for z in [.35,.83,1.31,1.73]:
    ribbon('carved diamond', [(-1.1,-.505,z+.15),(-.92,-.505,z),(-1.1,-.505,z-.15),(-1.28,-.505,z),(-1.1,-.505,z+.15)], .022)
for side in [-1,1]:
    ribbon('framing bevel', [(-1.1+side*.37,-.49,.15),(-1.1+side*.37,-.49,1.93)], .022)

# Sparse chipped coping fragments, concentrated near the broken wall gap.
for i in range(13):
    x=random.uniform(1.12,2.12)
    o=block('broken masonry fragment',(x,random.uniform(-.3,.3),random.uniform(.65,.88)),
        (random.uniform(.08,.22),random.uniform(.1,.22),random.uniform(.08,.2)),bevel=.014)
    o.rotation_euler=(random.random()*.4,random.random()*.4,random.random())

architecture = [o for o in scene.objects if o.type=='MESH']
# Bake broad mineral variation into exported vertex colors. This is actual mesh
# color data, so the GLB has the same material in Blender and Three.js.
for m in [*stone,trim]:
    nodes=m.node_tree.nodes
    color=nodes.new('ShaderNodeVertexColor')
    color.layer_name='SlateMinerals'
    m.node_tree.links.new(color.outputs['Color'],nodes.get('Principled BSDF').inputs['Base Color'])
for o in architecture:
    material=o.data.materials[0]
    if material not in [*stone,trim]:continue
    bpy.context.view_layer.objects.active=o
    if len(o.data.polygons)<150:
        sub=o.modifiers.new('surface color sampling','SUBSURF')
        sub.subdivision_type='SIMPLE';sub.levels=1
        bpy.ops.object.modifier_apply(modifier=sub.name)
    colors=o.data.color_attributes.new(name='SlateMinerals',type='BYTE_COLOR',domain='CORNER')
    base=material.diffuse_color
    for poly in o.data.polygons:
        for li in poly.loop_indices:
            v=o.data.vertices[o.data.loops[li].vertex_index]
            p=o.matrix_world@v.co
            broad=noise_vector(p*7.1)[0]
            grain=noise_vector(p*46.0)[1]
            value=.71+broad*.26+grain*.12
            colors.data[li].color=(*(max(0,min(1,c*value)) for c in base[:3]),1)
export_meshes=[]
for material in {o.data.materials[0] for o in architecture}:
    bpy.ops.object.select_all(action='DESELECT')
    group=[]
    for original in architecture:
        if original.data.materials[0]!=material:continue
        clone=original.copy();clone.data=original.data.copy()
        scene.collection.objects.link(clone);clone.select_set(True);group.append(clone)
    bpy.context.view_layer.objects.active=group[0]
    bpy.ops.object.join()
    group[0].name='batched_'+material.name
    export_meshes.append(group[0])
bpy.ops.object.select_all(action='DESELECT')
for o in export_meshes: o.select_set(True)
bpy.ops.export_scene.gltf(filepath=str(OUT/'bridge-wall-study.glb'),export_format='GLB',use_selection=True,
    export_cameras=False,export_lights=False,export_apply=True)
export_count=len(export_meshes)
for o in export_meshes:
    data=o.data;bpy.data.objects.remove(o,do_unlink=True)
    if not data.users:bpy.data.meshes.remove(data)

def area(name, loc, energy, size, color):
    bpy.ops.object.light_add(type='AREA', location=loc)
    o=bpy.context.object;o.name=name;o.data.energy=energy;o.data.shape='DISK';o.data.size=size;o.data.color=color
    o.rotation_euler=(Vector((0,0,.5))-o.location).to_track_quat('-Z','Y').to_euler()
area('soft cold sky',(-3,-4,8),1600,7,(.72,.83,1))
area('soft side bounce',(5,3,4),1000,6,(.55,.69,1))
area('front neutral fill',(1,-6,2),500,5,(.9,.9,1))
bpy.ops.object.camera_add()
camera=bpy.context.object
scene.camera=camera
camera.data.type='ORTHO'
camera.data.ortho_scale=8.1
def render(name, loc, target):
    camera.location=loc
    camera.rotation_euler=(Vector(target)-camera.location).to_track_quat('-Z','Y').to_euler()
    scene.render.filepath=str(OUT/(name+'.png'))
    bpy.ops.render.render(write_still=True)
render('architecture-main',(8,-12,8),(1,0,-.25))
render('architecture-side',(-9,-10,5),(1,0,-.25))
bpy.ops.wm.save_as_mainfile(filepath=str(OUT/'bridge-wall-study.blend'))

candidate=OUT/'lion-candidate.glb'
if candidate.exists():
    for o in architecture: o.hide_render=True
    before=set(scene.objects)
    bpy.ops.import_scene.gltf(filepath=str(candidate))
    imported=set(scene.objects)-before
    meshes=[o for o in imported if o.type=='MESH']
    bounds=[o.matrix_world@Vector(v) for o in meshes for v in o.bound_box]
    low=Vector(tuple(min(v[i] for v in bounds) for i in range(3)))
    high=Vector(tuple(max(v[i] for v in bounds) for i in range(3)))
    center=(low+high)*.5
    camera.data.ortho_scale=max(high-low)*1.5
    render('lion-candidate-review',center+Vector((2,-3,1.7))*max(high-low),center)

audit={'status':'study_only_not_approved','paid_requests':0,'source':'offline Blender modeling',
    'editable_mesh_count':len(architecture),'export_mesh_count':export_count,
    'triangles':sum(sum(len(p.vertices)-2 for p in o.data.polygons) for o in architecture),
    'gate':{'runtime_integration':False,'target_style_approved':False,'guardian_approved':False}}
(OUT/'audit.json').write_text(json.dumps(audit,indent=2),encoding='utf-8')
print('OFFLINE_PROTOTYPE_COMPLETE',audit)
