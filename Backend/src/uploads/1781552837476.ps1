$parametro = "firewall"

$profiles = Get-NetFirewallProfile

if ($profiles.Enabled -contains $false) {
    $valor = "NO CUMPLE"
    $estado = "parcialmente_deshabilitado"
} else {
    $valor = "CUMPLE"
    $estado = "habilitado"
}

$obj = @{
    parametro = $parametro
    valor_obtenido = $valor
    estado = $estado
}

$obj | ConvertTo-Json -Compress