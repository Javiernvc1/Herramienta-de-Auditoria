[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8
chcp 65001 > $null

$parametro = "usuarios_locales"

$usuarios = Get-LocalUser |
Where-Object { $_.Enabled -eq $true -and $_.Name -notmatch "DefaultAccount|WDAGUtilityAccount" } |
Select-Object -ExpandProperty Name

$valor = ($usuarios -join ",")

$obj = @{
    parametro = $parametro
    valor_obtenido = $valor
}

$obj | ConvertTo-Json -Compress