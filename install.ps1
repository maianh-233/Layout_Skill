# Cài skill layout-builder (+ design-taste-frontend) vào Claude Code của máy này.
# Chạy: chuột phải > Run with PowerShell, hoặc: powershell -ExecutionPolicy Bypass -File install.ps1
$ErrorActionPreference = 'Stop'
$dest = Join-Path $env:USERPROFILE '.claude\skills'
New-Item -ItemType Directory -Force $dest | Out-Null

foreach ($name in 'layout-builder', 'design-taste-frontend') {
  $src = Join-Path $PSScriptRoot $name
  $dst = Join-Path $dest $name
  if (Test-Path $dst) {
    # Giữ lại file .env (khóa ảnh) nếu đã có
    $env_ = Join-Path $dst '.env'
    $keep = if (Test-Path $env_) { Get-Content $env_ -Raw } else { $null }
    Remove-Item -Recurse -Force $dst
  } else { $keep = $null }
  Copy-Item -Recurse $src $dst
  if ($keep) { Set-Content -Path (Join-Path $dst '.env') -Value $keep -Encoding utf8 -NoNewline }
  Write-Host "Da cai: $dst"
}

if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
  Write-Host 'CANH BAO: chua co Node.js (can ban 18 tro len) - tai tai https://nodejs.org' -ForegroundColor Yellow
} else {
  Write-Host "Node: $(node --version)"
}
Write-Host 'Xong. Mo Claude Code va go: /layout-builder <mo ta website>'
