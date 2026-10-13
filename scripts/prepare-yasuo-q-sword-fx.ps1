param(
  [string]$OutputDirectory = 'assets/hero-skills/2026-10-12/yasuo/q-v9-sword-fx-only/inputs',
  [string]$BackgroundColor = 'Transparent',
  [string]$OutputName = 'sword-reference-padded.png'
)

# Canvas preparation only: preserve the original sword pixels and add motion space.
Add-Type -AssemblyName System.Drawing
$sourcePath = [IO.Path]::GetFullPath('assets/hero-skills/2026-10-12/yasuo/q-v5-small-grip-wind-e/media/wind-sword.png')
$targetDirectory = [IO.Path]::GetFullPath($OutputDirectory)
[IO.Directory]::CreateDirectory($targetDirectory) | Out-Null
$sourceImage = [Drawing.Image]::FromFile($sourcePath)
$preparedImage = New-Object Drawing.Bitmap(192, 64, [Drawing.Imaging.PixelFormat]::Format32bppArgb)
$graphics = [Drawing.Graphics]::FromImage($preparedImage)
try {
  $graphics.Clear([Drawing.ColorTranslator]::FromHtml($BackgroundColor))
  $graphics.CompositingMode = [Drawing.Drawing2D.CompositingMode]::SourceOver
  $graphics.DrawImageUnscaled($sourceImage, 8, 21)
  $targetPath = Join-Path $targetDirectory $OutputName
  $preparedImage.Save($targetPath, [Drawing.Imaging.ImageFormat]::Png)
  Write-Output $targetPath
} finally {
  $graphics.Dispose()
  $preparedImage.Dispose()
  $sourceImage.Dispose()
}
