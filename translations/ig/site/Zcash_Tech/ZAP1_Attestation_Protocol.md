# Usoro Nkwenye ZAP1 [ZAP1 Attestation Protocol]

ZAP1 bụ usoro nkwenye isi mmalite mepere emepe [open-source] maka Zcash. Ọ na-ede ihe omume nhazi nke usoro ndụ na osisi Merkle BLAKE2b ma na-edobe mgbọrọgwụ osisi ahụ on-chain site na memo nke e chebere echebe nke Orchard. Enwere ike ikwenye proof n'ihu ọha. Data ihe omume na-anọgide na nzuzo.

## Otu o si arụ ọrụ

Ndị na-arụ ọrụ na-edebanye ụdị ihe omume (mbugharị, Kwụọ ụhwọ, nnyefe, wdg.) ma nyefee ha na instans ZAP1. Ihe omume ọ bụla na-emepụta hash akwụkwọ site n'iji BLAKE2b-256 ekewapụtara na ngalaba. Akwụkwọ ndị ahụ na-agbakọta n'ime osisi Merkle. Mgbe e rutere n'ókè e setịpụrụ, a na-etinye mgbọrọgwụ osisi ahụ dị ka memo ZAP1:09 ma debe ya na Zcash n'ime Azụmahia nke e chebere echebe.

Onye ọ bụla nwere hash akwụkwọ nwere ike ikwenye ụzọ zuru ezu site n'akwụkwọ ruo na mgbọrọgwụ, ruo na nkwado on-chain, na-enweghị ịtụkwasị onye na-arụ ọrụ obi.

## Njirimara ndị bụ isi

- **Na-arụ ọrụ n'agbanyeghị ngwa**: onye na-arụ ọrụ Zcash ọ bụla nwere ike ịkọwa ụdị ihe omume na eriri nhazi nke ya
- **Na-echekwa Nzuzo**: a na-eme hash nke payload ihe omume tupu e debe ya. Naanị hash na-aga on-chain.
- **Enwere ike ikwenye n'onwe ya**: ikwenye chọrọ naanị ngwugwu proof na ịnweta chain. Ọ dịghị mkpa ịtụkwasị onye na-arụ ọrụ obi.
- **Dabara na ZIP 302**: ZAP1 na-abịarukwu nso na ZIP 302 partType maka payload nkwenye

## Ihe dị ugbu a

- Ntinye aka ntụaka (Rust, nwere ikikere MIT)
- SDK ikwenye na crates.io (Rust + 83KB WASM)
- SDK JavaScript na npm
- Ihe ngbanwe memo zuru ụwa ọnụ (na-achọpụta ZAP1, ZIP 302 TVLV, ederede, ọnụọgụ abụọ, na memo efu)
- Ngwa nnabata nwere nyocha API 29 na nyocha usoro 14
- Nhazi mbinye aka ókè FROST 2-n'ime-3 maka mgbasa nkwado ọtụtụ ndị otu
- PR #1243 nke ZIP ka a na-enyocha
- Nkwado mainnet 4 nwere akwụkwọ 14 ruo Maachị 2026

## Nhazi

```
Your app  -->  ZAP1 API  -->  Merkle tree  -->  Zcash anchor
                  |                                    |
             event types                         shielded memo
          (DEPLOYMENT, etc)                    (ZAP1:09:{root})
```

Onye na-arụ ọrụ ọ bụla na-agba instans ZAP1 nke ya, yana mkpịsị ugodi nke ya, osisi Merkle, na nkwado. Enweghị ọnọdụ a na-ekekọrịta n'etiti ndị na-arụ ọrụ.

## Ebe ị ga-amụtakwu

- Isi mmalite: [github.com/Frontier-Compute/zap1](https://github.com/Frontier-Compute/zap1)
- SDK ikwenye: [crates.io/crates/zap1-verify](https://crates.io/crates/zap1-verify)
- Ihe ngbanwe memo: [crates.io/crates/zcash-memo-decode](https://crates.io/crates/zcash-memo-decode)
- Nkọwa usoro: [ONCHAIN_PROTOCOL.md](https://github.com/Frontier-Compute/zap1/blob/main/ONCHAIN_PROTOCOL.md)
- Edemede ZIP: [PR #1243](https://github.com/zcash/zips/pull/1243)
- API dị ndụ: [pay.frontiercompute.io/protocol/info](https://pay.frontiercompute.io/protocol/info)
- Nduzi onye na-arụ ọrụ: [OPERATOR_GUIDE.md](https://github.com/Frontier-Compute/zap1/blob/main/OPERATOR_GUIDE.md)
