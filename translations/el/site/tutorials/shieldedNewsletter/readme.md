# Θωρακισμένα newsletters


## Ρύθμιση

 * Ο κόμβος Zebrad εκτελείται και είναι πλήρως συγχρονισμένος, με τα RPC ενεργοποιημένα και ρυθμισμένα να χρησιμοποιούν cookies
 * Το Zainod είναι πλήρως συγχρονισμένο
 * Το Zallet είναι ρυθμισμένο να εκτελεί RPC


### Εκκίνησε το Zallet

`./target/release/zallet -c /home/zktails/.zallet/zallet.toml start`

με ένα ρυθμισμένο αρχείο zallet.toml

παράδειγμα toml:

```markdown
[builder]

trusted_confirmations = 1

untrusted_confirmations = 1

[builder.limits]

[consensus]

network = "main"

[database]

[external]

[features]

as_of_version = "0.0.0"

[features.deprecated]

[features.experimental]

#
[indexer]


validator_address = "127.0.0.1:8232"

# Enable validator RPC cookie authentication.
validator_cookie_auth = true

# Path to the validator cookie file.
validator_cookie_path = "/home/zktails/.cache/zebra/.cookie"


db_path = "/home/zktails/.cache/zaino"

[keystore]

require_backup = false

[note_management]

[rpc]

bind = ["127.0.0.1:8237"]
```


### toCurl.sh

`chmod +x toCurl.sh`

Τροποποίησε τη σωστή θύρα RPC (8232) του zebrad και συμπερίλαβε το όνομα χρήστη και τον κωδικό πρόσβασης από το cookie zebrad


`__cookie__:yourpasswordhere`


### Δοκίμασε το RPC

`./target/release/zallet -c /home/zktails/.zallet/zallet.toml rpc help`

Θα πρέπει να εμφανίσει

```bash
getrawtransaction
getwalletinfo
help
listaddresses
rpc.discover
stop
walletlock
walletpassphrase
z_getaddressforaccount
z_getnewaccount
z_getnotescount
z_getoperationresult
z_getoperationstatus
z_gettotalbalance
z_listaccounts
z_listoperationids
z_listunifiedreceivers
z_listunspent
z_recoveraccounts
z_sendmany
z_viewtransaction
```
Σημείωση: Βεβαιώσου ότι έχεις ένα αντίγραφο του εκτελέσιμου zallet στον φάκελο όπου εκτελείς το script

### Εκτέλεσε τα scripts

`chmod +x ascii2hex hex2ascii shieldNewsletter.sh txBuilderFromFile.sh toCurl.sh`

Ενημέρωσε το daoAddress.md με τις UA που θέλεις να χρησιμοποιήσεις

Άνοιξε το txBuilderFromFile.sh και ενημέρωσε τη μεταβλητή «from» με τη χρηματοδοτούμενη UA που βρίσκεται στο πορτοφόλι zallet σου

Στη συνέχεια,

`./shieldNewsletter.sh yourNewsletterHere.md`
