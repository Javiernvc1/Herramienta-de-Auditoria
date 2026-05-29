$parametro = "usb_conectados"

$usb = Get-PnpDevice | Where-Object { $_.Class -eq "USB" -and $_.Status -eq "OK" } |
Select-Object -ExpandProperty FriendlyName

$valor = ($usb -join ",")

$obj = @{
    parametro = $parametro
    valor_obtenido = $valor
}

$obj | ConvertTo-Json -Compress