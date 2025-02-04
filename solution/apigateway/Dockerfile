# Etapa de compilación
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /app

# Copiar archivos de proyecto y restaurar dependencias
COPY *.sln ./
COPY src/OcelotGateway/*.csproj ./src/OcelotGateway/
RUN dotnet restore ./src/OcelotGateway/OcelotGateway.csproj

# Copiar el código y compilar
COPY src/OcelotGateway/ ./src/OcelotGateway/
WORKDIR /app/src/OcelotGateway
RUN dotnet publish -c Release -o /out

# Etapa de ejecución
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS runtime
WORKDIR /app
COPY --from=build /out .

# Configurar el puerto correcto y Data Protection
ENV ASPNETCORE_URLS=http://+:5041
ENV DOTNET_SYSTEM_GLOBALIZATION_INVARIANT=false

# Asegurar persistencia de claves de protección de datos (evitar advertencia)
RUN mkdir -p /var/protection-keys
ENV DOTNET_DataProtection__KeyDirectory=/var/protection-keys

# Exponer el puerto correcto
EXPOSE 5041

# Ejecutar la aplicación
ENTRYPOINT ["dotnet", "OcelotGateway.dll"]



