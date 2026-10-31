<a href="https://github.com/zechub/zechub/edit/main/site/guides/Visualizing_Zcash_Addresses.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Επεξεργασία σελίδας"/>
</a>


# Οπτικοποίηση διευθύνσεων Zcash

Αν μαθαίνεις για το Zcash για πρώτη φορά, θα καταλάβεις αμέσως ότι μπορούν να πραγματοποιηθούν δύο είδη [συναλλαγών](https://zechub.wiki/using-zcash/transactions): *διαφανείς* και *θωρακισμένες*.
Επιπλέον, αν παρακολουθείς τις τελευταίες εξελίξεις στο οικοσύστημα του Zcash, μπορεί να έχεις μάθει για τις [Ενιαίες διευθύνσεις](https://web.archive.org/web/20260823012524/https://electriccoin.co/blog/unified-addresses-in-zcash-explained/), ή UA.
Όταν άνθρωποι στον κλάδο του Zcash μιλούν για *θωρακισμένες* συναλλαγές, εννοούν συναλλαγές που περιλαμβάνουν διευθύνσεις κωδικοποιημένες είτε για τα πρωτόκολλα sapling είτε orchard. 
Οι UA έχουν σχεδιαστεί για να ενοποιούν *οποιοδήποτε* είδος θωρακισμένης ή διαφανούς συναλλαγής σε μία μόνο διεύθυνση. Αυτή η γενίκευση είναι το κλειδί για την απλοποίηση της εμπειρίας χρήστη στο μέλλον. Σκοπός αυτού του οδηγού είναι να συμπληρώσει την κατανόηση των UA με συγκεκριμένα οπτικά παραδείγματα.

## Τύποι διευθύνσεων Zcash

Προς το παρόν, υπάρχουν τρεις κύριοι τύποι διευθύνσεων που χρησιμοποιούνται. Αυτοί περιλαμβάνουν

* διαφανείς

![img1](/content-images/219261771-a9957ec3-2841-4073-9cfd-1db9d6-574fc930f0.webp)

* sapling

![img2](/content-images/219261784-1a617e70-f588-4eed-96bf-f0789d-e10ebfc543.webp)

* Ενοποιημένη διεύθυνση (Πλήρης)

![img3](/content-images/219261794-bcc79db6-4dc6-4c6a-867b-3717b8-a3650f8968.webp)


Το πρώτο πράγμα που πρέπει να προσέξεις είναι ότι το μήκος κάθε τύπου διεύθυνσης διαφέρει. Μπορείς να το δεις οπτικά από τον αριθμό των χαρακτήρων στη συμβολοσειρά της διεύθυνσης *ή* κοιτάζοντας τους αντίστοιχους κωδικούς QR. Καθώς αυξάνεται το μήκος της διεύθυνσης, ο κωδικός QR τείνει να σμικρύνεται και να χωρά περισσότερα δεδομένα στο τετράγωνο.

* Η `t1goiSyw2JinFCmUnfiwwp72LEZzD42TyYu` έχει μήκος 35 χαρακτήρες
* Η `zs1cpf4prtmnqpg6x2ngcrwelu9a39z9l9lqukq9fwagnaqrknk34a7n3szwxpjuxfjdxkuzykel53` έχει μήκος 78 χαρακτήρες
* Η `u1ckeydud0996ftppqrnpdsqyeq4e57qcyjr4raht4dc8j3njuyj3gmm9yk7hq9k88cdkqfuqusgpcpjfhwu3plm2vrd32g8du78kzkm5un357r4vkhz4vhxd4yfl8zvszk99cmsc89qv4trd7jzkcs8h6lukzgy25j8cv76p0g603nrrg6yt6cxsh2v8rmkasskd69ylfyphhjyv0cxs` έχει μήκος 213 χαρακτήρες

Το δεύτερο πράγμα που πρέπει να προσέξεις είναι το πρόθεμα κάθε συμβολοσειράς διεύθυνσης -- οι διαφανείς ξεκινούν με *t*, οι sapling με *zs* και, τέλος, οι UA με *u1*.

Είναι σημαντικό να σημειωθεί:

#### «Οι Orchard διευθύνσεις πληρωμών δεν έχουν αυτόνομη κωδικοποίηση συμβολοσειράς. Αντίθετα, ορίζουμε “ενιαίες διευθύνσεις” που μπορούν να ομαδοποιούν διευθύνσεις διαφορετικών τύπων, συμπεριλαμβανομένων των Orchard. Οι ενιαίες διευθύνσεις έχουν Αναγνώσιμο από άνθρωπο τμήμα “u” στο Mainnet, δηλαδή θα έχουν το πρόθεμα “u1”.»

## Δέκτες ενοποιημένης διεύθυνσης

Όπως συζητήθηκε [εδώ](https://medium.com/@hanh425/transaction-privacy-78f80f9f175e), μπορείς να δημιουργήσεις UA με διαφορετικούς δέκτες -- κάποιον συνδυασμό διαφανών, sapling και orchard τύπων διευθύνσεων.
Πέρα από μια πλήρη UA, παρακάτω είναι οι συνηθέστερες που θα βρεις στην πράξη:

* διαφανής + sapling

![img4](/content-images/219267475-38ad1419-0aac-4205-b18e-687328-46b8f12f80.webp)

* διαφανής + orchard


![img5](/content-images/219267496-90db21ff-f4e1-4a50-8f2a-1a71d9-7423486eb5.webp)

* sapling + orchard


![img6](/content-images/219267520-6b731ec2-e911-4469-acc5-c39d4a-a89ba01b88.webp)

* orchard
  
![img7](/content-images/219267538-1a748fff-4034-4559-96ac-182723-3d69e23dac.webp)

Το πρώτο πράγμα που πρέπει να σημειώσεις είναι ότι κάθε μία από αυτές τις UA προέρχεται από το ίδιο ιδιωτικό κλειδί! Το δεύτερο πράγμα που πρέπει να σημειώσεις είναι τα μήκη κάθε τύπου UA:

* t+s `u13qutpuktq026dwczvxmnh8mxdacsjx3kg2rrhzgns8zsty53t9y0hqp5d440zc9w7z7zkkjqw8dq0uuc0mkt883464mq8mkys7l4xjnhylh7u3u02ukknurm5yxerqlf500y2atq28e` 141 χαρακτήρες
* t+o `u1yvwppp7ann6n3pgkysdu0spvr50w4jf4jwgme3c8x8fp4av59rupgvdd3fddc3f2cwrk3ghs5lxt87ggj8cvjuzcrf4jkejwlu9pc83gk2vtx03ucqcc3ed0furcuypqs6d6swu3nws` 141 χαρακτήρες
* s+o `u1dq8kg78fgpjsc7dn2ynpdzc8xu99wra0jec4jy30rjqk5frsj62qtgqcu9nn0j8g352phlwprshancgxcuhdcclx0wxtvqylhmuegas7ul8hwnwggy727l05pyujuywtnn4nkfznctaelpkcrqcm9cxhkgv3t9jtrvgym7la5varrmzc` 178 χαρακτήρες
* o   `u1cysntkxwt0h4sahp7rhj7u27pgc2ga7685ekf65g0d5ht5glkfm4zkumhvkd2zg2pdrgv3mrwq2x3vw2yl5u7zef3cr2nqwrzu7v2dsa` 106 χαρακτήρες

Το τρίτο πράγμα που πρέπει να σημειώσεις είναι ότι οπτικά κάθε UA είναι ελαφρώς διαφορετική! Η δύναμη των UA είναι η *επιλογή* που επιτρέπουν στους τελικούς χρήστες. Αν στο μέλλον χρειαστεί ένα νέο πρωτόκολλο, οι UA θα είναι έτοιμες.

## Πηγές

https://zcash.github.io/orchard/design/keys.html

https://medium.com/@hanh425/transaction-privacy-78f80f9f175e
