---
term: "DNS (Domain Name System)"
definition: "El sistema que traduce nombres de dominio legibles (google.com) a direcciones IP numéricas que las computadoras usan para comunicarse."
relatedGuides:
  - yellow-belt/como-funciona-la-web
  - black-belt/aws-para-desarrolladores
tags: [dns, redes, web, infraestructura]
lastRevision: "2026-05-19"
---

El **DNS** (Domain Name System) es un sistema jerárquico y distribuido que resuelve nombres de dominio a direcciones IP. Funciona como una cadena de consultas:

1. **Caché local** → ¿Ya resolvió este dominio?
2. **DNS recursivo** (ISP, Google 8.8.8.8, Cloudflare 1.1.1.1)
3. **Servidores Root** → dirigen a los TLD
4. **Servidores TLD** (.com, .org, .cl) → dirigen al autoritativo
5. **Nameservers autoritativos** → tienen la IP real

Tipos de registros principales: **A** (IPv4), **AAAA** (IPv6), **CNAME** (alias), **MX** (email), **TXT** (texto), **NS** (nameservers).

## Ver también

- [Cómo funciona la web: HTTP, DNS y navegadores](/guides/yellow-belt/como-funciona-la-web)
- [AWS para desarrolladores: los servicios que realmente necesitas](/guides/black-belt/aws-para-desarrolladores)
