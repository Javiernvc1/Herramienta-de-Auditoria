[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8
chcp 65001 > $null

$parametro = "politica_password"

# ==========================================
# Exportar política local
# ==========================================

$tempCfg = "$env:TEMP\security.cfg"

secedit /export /cfg $tempCfg > $null 2>&1

# Leer archivo
$cfg = Get-Content $tempCfg

# Buscar longitud mínima
$minLine = $cfg | Where-Object {
    $_ -match "^MinimumPasswordLength\s*="
}

if ($minLine) {

    $minLength =
        [int](
            ($minLine -split "=")[1].Trim()
        )
}
else {

    $minLength = 0
}

# ==========================================
# Contraseñas en blanco
# ==========================================

$limitBlank =
    (Get-ItemProperty `
        "HKLM:\SYSTEM\CurrentControlSet\Control\Lsa"
    ).LimitBlankPasswordUse

if ($limitBlank -eq 1) {

    $comp = "habilitada"
}
else {

    $comp = "no_habilitada"
}

# ==========================================
# Evaluación
# ==========================================

if (
    $minLength -ge 8 `
    -and `
    $comp -eq "habilitada"
) {

    $estado = "CUMPLE"
}
else {

    $estado = "NO CUMPLE"
}

# ==========================================
# Resultado
# ==========================================

$obj = @{
    parametro      = $parametro
    valor_obtenido = "Longitud mínima: $minLength | Contraseñas en blanco: $comp"
    estado         = $estado
}

$obj | ConvertTo-Json -Compress

# Limpieza
Remove-Item $tempCfg -ErrorAction SilentlyContinue