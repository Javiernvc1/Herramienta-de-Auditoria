#!/bin/bash

parametro="usuarios_admin"

admins_sudo=$(getent group sudo | cut -d: -f4)
admins_wheel=$(getent group wheel | cut -d: -f4)

if [ -n "$admins_sudo" ] && [ -n "$admins_wheel" ]; then
  admins="$admins_sudo,$admins_wheel"
elif [ -n "$admins_sudo" ]; then
  admins="$admins_sudo"
elif [ -n "$admins_wheel" ]; then
  admins="$admins_wheel"
else
  admins=""
fi

# Limpiar comas duplicadas o finales
admins=$(echo "$admins" | sed 's/,,*/,/g; s/^,//; s/,$//')

# Escapar caracteres especiales para JSON
admins=$(echo "$admins" | sed 's/\\/\\\\/g; s/"/\\"/g')

printf '{"parametro":"%s","valor_obtenido":"%s"}\n' "$parametro" "$admins"