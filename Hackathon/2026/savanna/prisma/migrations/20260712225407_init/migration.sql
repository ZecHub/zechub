-- CreateTable
CREATE TABLE "WalletConfig" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT DEFAULT 1,
    "idAccount" INTEGER NOT NULL,
    "ciphertext" BLOB NOT NULL,
    "nonce" BLOB NOT NULL,
    "authTag" BLOB NOT NULL,
    "salt" BLOB NOT NULL,
    "adminHash" TEXT NOT NULL,
    "hmacSalt" BLOB NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "orderId" TEXT NOT NULL,
    "amountZec" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "memo" TEXT NOT NULL,
    "uri" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "txid" TEXT,
    "receivedZec" TEXT,
    "detectedAt" DATETIME,
    "expiresAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "Payment_orderId_key" ON "Payment"("orderId");
