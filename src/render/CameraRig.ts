import { VIEWPORT, WORLD } from '../game/config';
import { clamp } from '../game/geometry';
import type { Point } from '../game/types';

/** Camera math is independent of simulation, rendering and the DOM. */
export class CameraRig {
  private focus: Point = { x: WORLD.width / 2, y: WORLD.height / 2 };
  following = true;
  zoom: 1 | 1.5 = 1;

  get center(): Point {
    return {
      x: clamp(Math.round(this.focus.x), VIEWPORT.width / this.zoom / 2, WORLD.width - VIEWPORT.width / this.zoom / 2),
      y: clamp(Math.round(this.focus.y), VIEWPORT.height / this.zoom / 2, WORLD.height - VIEWPORT.height / this.zoom / 2),
    };
  }

  get bounds(): { x: number; y: number; width: number; height: number } {
    const width = VIEWPORT.width / this.zoom, height = VIEWPORT.height / this.zoom;
    return { x: this.center.x - width / 2, y: this.center.y - height / 2, width, height };
  }

  reset(hero: Point): void {
    this.following = true;
    this.zoom = 1;
    this.lookAt(hero);
  }

  lookAt(point: Point): void {
    const halfWidth = VIEWPORT.width / this.zoom / 2, halfHeight = VIEWPORT.height / this.zoom / 2;
    // Retain subpixel pan increments; only the rendered center snaps to pixels.
    this.focus = {
      x: clamp(point.x, halfWidth, WORLD.width - halfWidth),
      y: clamp(point.y, halfHeight, WORLD.height - halfHeight),
    };
  }

  toggleFollow(hero: Point): void {
    this.following = !this.following;
    if (this.following) this.lookAt(hero);
  }

  pan(dx: number, dy: number): void {
    this.following = false;
    this.lookAt({ x: this.focus.x + dx, y: this.focus.y + dy });
  }

  setZoom(zoom: 1 | 1.5): void {
    this.zoom = zoom;
    this.lookAt(this.focus);
  }

  screenToWorld(point: Point): Point {
    const bounds = this.bounds;
    return { x: bounds.x + point.x / this.zoom, y: bounds.y + point.y / this.zoom };
  }

  worldToScreen(point: Point): Point {
    const bounds = this.bounds;
    return { x: (point.x - bounds.x) * this.zoom, y: (point.y - bounds.y) * this.zoom };
  }
}
