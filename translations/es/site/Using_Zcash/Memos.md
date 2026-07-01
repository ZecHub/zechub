<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Memos.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Editar página"/>
</a>

# Memos

#### Envío de memos cifrados

Al enviar una transacción Z2Z (shielded-to-shielded), puedes incluir un memo (mensaje) en la transacción. Este memo puede usarse para varias cosas diferentes.

#### Firma de transacciones

Los memos se utilizan principalmente para firmar pagos. Dado que las transacciones shielded cifran tus datos, no puedes ver quién te envió ZEC ni para qué podrían haber sido esos ZEC. Los usuarios pueden usar el campo de memo para firmar con su nombre o seudónimo y así informar a su contraparte de quién provino la transacción. También pueden describir para qué era la transacción.

#### Envío de un mensaje

Otro caso de uso del memo cifrado es enviar un mensaje a alguien con una z-addr. Estos mensajes pueden tratar sobre cualquier cosa, ya sea un [recordatorio para un amigo](https://twitter.com/iansagstette/status/1542142468505870336) o un [mensaje delicado que debe permanecer lo más privado posible](https://twitter.com/InsideZcash/status/1545800146352578560).

#### Cartas de amor en la blockchain

Hubo una persona que le envió a su pareja una nota de amor en uno de los primeros bloques de la blockchain de Zcash. Alguien descubrió que su pareja le había enviado un archivo mediante un memo de Zcash. Este archivo era una entrada para un evento especial en el extranjero, al que ella y su amor lejano habían estado hablando de asistir juntos. El memo era una nota de amor.

#### Avanzado

Así es como se usan los Shielded Memos de Zcash con la CLI de Magic-Wormhole y zcashd para enviar archivos de forma segura de una computadora a otra!: 

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/8iqPCza9o6A"
    title="DEMO: Transferencia cifrada de archivos con Zcash 📁"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

#### Recursos

[El campo de memo cifrado](https://electriccoin.co/blog/encrypted-memo-field/)
