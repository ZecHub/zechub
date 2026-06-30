---
published: 2025-08-02
---

<a href="https://github.com/Zechub/zechub/edit/main/site/Research/Namada_Best_Practices.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar página"/>
</a>

![Logotipo de Namada](https://raw.githubusercontent.com/ZecHub/zechub-wiki/main/public/nam.png)

# Mejores prácticas de privacidad de Namada

> Guía práctica y accionable para lograr la máxima privacidad en Namada y comprender exactamente dónde terminan sus protecciones.

**La privacidad es un derecho fundamental.** Namada fue diseñado específicamente para protegerla mediante criptografía avanzada de conocimiento cero. Esta guía resume las prácticas más eficaces utilizadas por usuarios y desarrolladores conscientes de la privacidad.

---

## Cómo Namada protege tu privacidad

Namada es una blockchain soberana, centrada en la privacidad, que oculta direcciones de billetera, montos de transacción y saldos mediante **pruebas de conocimiento cero (zk-SNARKs)**.

### Funcionalidades principales de privacidad

- **Transacciones blindadas** - Ocultan completamente al remitente, al receptor y los montos.
- **Multi-Asset Shielded Pool (MASP)** - Transferencias privadas, intercambios y puentes entre cualquier activo.
- **Privacidad entre cadenas** - Puentes blindados mediante IBC (compatibilidad con Ethereum y Solana próximamente).
- **Recompensas de rendimiento blindadas** - Gana tokens NAM simplemente blindando transacciones.
- **Comisiones bajas** - Privacidad sólida sin sacrificar usabilidad.

---

## Limitaciones importantes

Incluso la privacidad on-chain más sólida puede verse comprometida por el comportamiento del usuario o por factores off-chain.

<div class="border-l-4 border-yellow-400 bg-yellow-400/10 p-6 my-8 rounded-r-xl text-sm">

**Namada NO protege contra:**

- Conectarte sin una VPN o Tor (tu dirección IP queda expuesta)
- Reutilizar direcciones blindadas repetidamente
- Realizar transacciones transparentes (no blindadas)
- Vincular tu dirección de Namada con redes sociales o con tu identidad del mundo real
- Usar exchanges centralizados con KYC para depósitos o retiros

</div>

---

## Mejores prácticas para máxima privacidad

### 1. Principios generales
- Usa por defecto **transacciones blindadas** para cada acción.
- Nunca reutilices direcciones blindadas para distintos propósitos.
- Evita mezclar actividad blindada y transparente en la misma sesión.

### 2. Puentes de activos
- Usa una dirección transparente dedicada **solo** para puentes entrantes.
- Blinda los activos inmediatamente después de hacer el puente hacia dentro.
- Minimiza, cuando sea posible, los puentes de salida desde Namada.

### 3. MASP (Multi-Asset Shielded Pool)
- Mantén todos los activos dentro del MASP por defecto.
- Trata tu saldo en el MASP como tu billetera privada principal.

### 4. Viewing Key
- Comparte las Viewing Key **solo** con partes en las que confíes plenamente.
- Nunca publiques ni difundas Viewing Key en espacios públicos.

### 5. Higiene de transacciones
- Aleatoriza el tiempo y los montos entre transacciones.
- Agrupa varias transacciones cuando sea posible.
- Evita enviar montos redondos o fácilmente identificables.

### 6. Seguridad operativa
- Usa siempre una **VPN** (idealmente Tor) al interactuar con billeteras o dApps.
- Nunca compartas capturas de pantalla que contengan direcciones o saldos.
- Usa billeteras separadas para diferentes actividades (trading, donaciones, uso personal).

---

## Lista ampliada de verificación de privacidad

1. **Blinda siempre primero** - mueve los activos al MASP antes de realizar transacciones.
2. **Rota las direcciones blindadas** regularmente para diferentes casos de uso.
3. **Retira directamente a direcciones blindadas** desde exchanges cuando sea posible.
4. **Varía el momento de las transacciones** para romper patrones identificables.
5. **Usa hardware wallets** para tenencias más grandes.
6. **Mantén el software actualizado** - ejecuta siempre el cliente más reciente de Namada.
7. **Protege tu dispositivo** con cifrado sólido y gestores de contraseñas.
8. **Sé extremadamente cauteloso** con las filtraciones de metadatos en chats o registros públicos.

---

## Contribuye

¿Tienes prácticas adicionales o comentarios?  
[Únete a la conversación en Discord](https://discord.gg/srC76aE6)

---
*Última actualización: marzo de 2026*
