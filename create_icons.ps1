Add-Type -AssemblyName System.Drawing

function Create-PwaIcon($size, $filename) {
    $bmp = New-Object System.Drawing.Bitmap($size, $size)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias

    # Background Pastel Sage Green
    $bgBrush = New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml("#5b9286"))
    $g.FillRectangle($bgBrush, 0, 0, $size, $size)

    # Soft Inner Pastel Circle
    $innerBrush = New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml("#e4f0ed"))
    $margin = [int]($size * 0.08)
    $innerSize = $size - ($margin * 2)
    $g.FillEllipse($innerBrush, $margin, $margin, $innerSize, $innerSize)

    # Text / Logo Symbol
    $fontSize = [float]($size * 0.35)
    $font = New-Object System.Drawing.Font("Segoe UI Emoji", $fontSize, [System.Drawing.FontStyle]::Bold)
    $textBrush = New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml("#2d6b5e"))
    
    $stringFormat = New-Object System.Drawing.StringFormat
    $stringFormat.Alignment = [System.Drawing.StringAlignment]::Center
    $stringFormat.LineAlignment = [System.Drawing.StringAlignment]::Center

    $rect = New-Object System.Drawing.RectangleF(0, 0, $size, $size)
    $g.DrawString("🍃", $font, $textBrush, $rect, $stringFormat)

    $bmp.Save($filename, [System.Drawing.Imaging.ImageFormat]::Png)
    $g.Dispose()
    $bmp.Dispose()
    Write-Host "Successfully generated icon: $filename ($size x $size)"
}

Create-PwaIcon 192 "d:\Mandarin Chill\icon-192.png"
Create-PwaIcon 512 "d:\Mandarin Chill\icon-512.png"
