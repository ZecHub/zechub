---
published: 2025-08-02
---

<a href="https://github.com/Zechub/zechub/edit/main/site/Research/Namada_Privacy_and_Best_Practices.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

![Namada Logo](/content-images/nam-078c7b6883.webp)

# Namada Mejores prácticas de privacidad [Privacy Best Practices]

> Orientación práctica y aplicable para lograr la máxima privacidad en Namada y comprender exactamente dónde terminan sus protecciones.

**La privacidad es un derecho fundamental.** Namada fue creada específicamente para protegerla mediante criptografía avanzada zero-knowledge [zero-knowledge]. Esta guía reúne las prácticas más eficaces utilizadas por usuarios y desarrolladores [developers] conscientes de la privacidad.

---

## Cómo Namada protege tu privacidad

Namada es una blockchain soberana, centrada en la privacidad, que oculta las direcciones de las billeteras [wallets], los importes de las transacciones [transactions] y los saldos mediante **pruebas zero-knowledge [zero-knowledge proofs] (zk-SNARKs)**.

### Funciones principales de privacidad

- **Transacciones blindadas [Shielded Transactions]** - Ocultan completamente al remitente, al destinatario y los importes.
- **Pool blindado multiactivo [Multi-Asset Shielded Pool] (MASP)** - Transferencias privadas, swaps y conexiones mediante puentes entre cualquier activo.
- **Privacidad cross-chain [Cross-Chain Privacy]** - Conexiones mediante puentes blindados a través de IBC (la compatibilidad con Ethereum y Solana llegará pronto).
- **Recompensas de rendimiento blindadas [Shielded Yield Rewards]** - Obtén tokens NAM simplemente al blindar transacciones.
- **Tarifas bajas [Low Fees]** - Privacidad sólida sin sacrificar la facilidad de uso.

---

## Limitaciones importantes

Incluso la privacidad on-chain más sólida puede verse comprometida por el comportamiento del usuario o por factores off-chain.

<div class="border-l-4 border-yellow-400 bg-yellow-400/10 p-6 my-8 rounded-r-xl text-sm">

**Namada NO protege contra:**

- Conectarse sin una VPN o Tor (tu dirección IP queda expuesta)
- Reutilizar direcciones blindadas repetidamente
- Realizar transacciones transparentes (sin blindaje)
- Vincular tu dirección de Namada con redes sociales o con tu identidad real
- Utilizar exchanges centralizados con KYC para depósitos o retiros

</div>

---

## Mejores prácticas para una privacidad máxima

### 1. Principios generales
- Prioriza las **transacciones blindadas** para cada acción.
- Nunca reutilices direcciones blindadas para fines distintos.
- Evita mezclar actividad blindada y transparente en la misma sesión.

### 2. Conexión de activos mediante puentes
- Utiliza una dirección transparente dedicada **solo** para los puentes entrantes.
- Blinda los activos inmediatamente después de conectarlos mediante un puente.
- Minimiza las conexiones mediante puentes fuera de Namada cuando sea posible.

### 3. MASP (Pool blindado multiactivo)
- Mantén todos los activos dentro del MASP de forma predeterminada.
- Trata tu saldo de MASP como tu billetera privada principal.

### 4. Claves de visualización [View Keys]
- Comparte claves de visualización **solo** con partes en las que confíes plenamente.
- Nunca publiques ni compartas claves de visualización de forma pública.

### 5. Higiene de transacciones
- Aleatoriza los horarios y los importes entre transacciones.
- Agrupa varias transacciones cuando sea posible.
- Evita enviar importes redondos o muy identificables.

### 6. Seguridad operativa
- Utiliza siempre una **VPN** (idealmente Tor) al interactuar con billeteras o dApps.
- Nunca compartas capturas de pantalla que contengan direcciones o saldos.
- Utiliza billeteras separadas para distintas actividades (trading, donaciones, uso personal).

---

## Lista de verificación ampliada de privacidad

1. **Blinda siempre primero** - mueve los activos a MASP antes de realizar transacciones.
2. **Rota las direcciones blindadas** periódicamente para distintos casos de uso [use cases].
3. **Retira directamente a direcciones blindadas** desde exchanges cuando sea posible.
4. **Varía el horario de las transacciones** para romper patrones identificables.
5. **Utiliza hardware wallets** para tenencias más grandes.
6. **Mantén el software actualizado** - ejecuta siempre el cliente Namada más reciente.
7. **Protege tu dispositivo** con cifrado sólido y gestores de contraseñas.
8. **Ten extrema precaución** con las filtraciones de metadatos en chats o registros públicos.

---

## Contribuye

¿Tienes mejores prácticas adicionales o comentarios?  
[Únete a la conversación en Discord](https://discord.gg/srC76aE6)

---
*Última actualización: marzo de 2026*
