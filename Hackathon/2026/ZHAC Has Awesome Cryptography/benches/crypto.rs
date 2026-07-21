use criterion::{black_box, criterion_group, criterion_main, Criterion};
use zhac::{
    encrypt,
    keys::{ZhacKeyPair, ZhacKeySeed, ZhacPrivateKey},
    sign,
};

fn bench_key_generation(c: &mut Criterion) {
    c.bench_function("key_generation", |b| {
        b.iter(|| {
            black_box(ZhacKeyPair::generate().unwrap());
        });
    });
}

fn bench_key_derivation(c: &mut Criterion) {
    let seed = ZhacKeySeed::generate();
    c.bench_function("key_derivation_from_seed", |b| {
        b.iter(|| {
            let sk = ZhacPrivateKey::from_seed(&seed);
            black_box(sk.to_public_key(&[0u8; 11]).unwrap());
        });
    });
}

fn bench_diversify_hash(c: &mut Criterion) {
    let seed = ZhacKeySeed::generate();
    let sk = ZhacPrivateKey::from_seed(&seed);
    let d = [0x42u8; 11];
    c.bench_function("diversify_hash+pk_d", |b| {
        b.iter(|| {
            black_box(sk.to_public_key(black_box(&d)).unwrap());
        });
    });
}

fn bench_encrypt(c: &mut Criterion) {
    let (kp, _) = ZhacKeyPair::generate().unwrap();
    let plaintext = b"benchmark encryption payload - 48 bytes of data!!";
    c.bench_function("encrypt_48b", |b| {
        b.iter(|| {
            let _ = encrypt::encrypt(black_box(plaintext), black_box(&kp.public_key));
        });
    });
}

fn bench_decrypt(c: &mut Criterion) {
    let (kp, _) = ZhacKeyPair::generate().unwrap();
    let plaintext = b"benchmark encryption payload - 48 bytes of data!!";
    let ct = encrypt::encrypt(plaintext, &kp.public_key).unwrap();
    c.bench_function("decrypt_48b", |b| {
        b.iter(|| {
            let _ = encrypt::decrypt(black_box(&ct), black_box(&kp.private_key));
        });
    });
}

fn bench_encrypt_large(c: &mut Criterion) {
    let (kp, _) = ZhacKeyPair::generate().unwrap();
    let plaintext = vec![0u8; 65536];
    c.bench_function("encrypt_64kb", |b| {
        b.iter(|| {
            let _ = encrypt::encrypt(black_box(&plaintext), black_box(&kp.public_key));
        });
    });
}

fn bench_decrypt_large(c: &mut Criterion) {
    let (kp, _) = ZhacKeyPair::generate().unwrap();
    let plaintext = vec![0u8; 65536];
    let ct = encrypt::encrypt(&plaintext, &kp.public_key).unwrap();
    c.bench_function("decrypt_64kb", |b| {
        b.iter(|| {
            let _ = encrypt::decrypt(black_box(&ct), black_box(&kp.private_key));
        });
    });
}

fn bench_sign(c: &mut Criterion) {
    let (kp, _) = ZhacKeyPair::generate().unwrap();
    let msg = b"benchmark signing message";
    c.bench_function("sign", |b| {
        b.iter(|| {
            let _ = sign::sign(black_box(msg), black_box(&kp.private_key));
        });
    });
}

fn bench_verify(c: &mut Criterion) {
    let (kp, _) = ZhacKeyPair::generate().unwrap();
    let msg = b"benchmark signing message";
    let sig = sign::sign(msg, &kp.private_key).unwrap();
    c.bench_function("verify", |b| {
        b.iter(|| {
            let _ = sign::verify(black_box(msg), black_box(&sig), black_box(&kp.public_key));
        });
    });
}

fn bench_multi_encrypt(c: &mut Criterion) {
    let (kp1, _) = ZhacKeyPair::generate().unwrap();
    let (kp2, _) = ZhacKeyPair::generate().unwrap();
    let (kp3, _) = ZhacKeyPair::generate().unwrap();
    let plaintext = b"multi-recipient benchmark payload";
    c.bench_function("encrypt_multi_3_recipients", |b| {
        b.iter(|| {
            let _ = encrypt::encrypt_multi(
                black_box(plaintext),
                black_box(&[
                    kp1.public_key.clone(),
                    kp2.public_key.clone(),
                    kp3.public_key.clone(),
                ]),
            );
        });
    });
}

fn bench_fingerprint(c: &mut Criterion) {
    let (kp, _) = ZhacKeyPair::generate().unwrap();
    c.bench_function("fingerprint", |b| {
        b.iter(|| {
            black_box(kp.public_key.fingerprint());
        });
    });
}

criterion_group!(
    benches,
    bench_key_generation,
    bench_key_derivation,
    bench_diversify_hash,
    bench_encrypt,
    bench_decrypt,
    bench_encrypt_large,
    bench_decrypt_large,
    bench_sign,
    bench_verify,
    bench_multi_encrypt,
    bench_fingerprint,
);
criterion_main!(benches);
