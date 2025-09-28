#if !defined(__APPLE__) || !defined(TARGET_OS_IPHONE)
typedef signed char int8_t;
typedef unsigned char uint8_t;
typedef unsigned short int uint16_t;
typedef long long int int64_t;
typedef unsigned long long int uint64_t;
typedef unsigned long int uintptr_t;
typedef int int32_t;
typedef unsigned int uint32_t;
#ifndef __cplusplus
typedef char bool;
#endif
#endif
typedef void *DartPostCObjectFnType;


#define EXPIRY_HEIGHT_OFFSET 50

#define QR_DATA_SIZE 256

#define MAX_ATTEMPTS 10

#define N 200000

typedef struct CResult_u8 {
  uint8_t value;
  char *error;
  uint32_t len;
} CResult_u8;

typedef struct CResult_u32 {
  uint32_t value;
  char *error;
  uint32_t len;
} CResult_u32;

typedef struct CResult______u8 {
  const uint8_t *value;
  char *error;
  uint32_t len;
} CResult______u8;

typedef struct CResult_____c_char {
  char *value;
  char *error;
  uint32_t len;
} CResult_____c_char;

typedef struct CResult_bool {
  bool value;
  char *error;
  uint32_t len;
} CResult_bool;

typedef struct CResult_u64 {
  uint64_t value;
  char *error;
  uint32_t len;
} CResult_u64;

#define IdList_VT_IDS 4

#define Account_VT_COIN 4

#define Account_VT_ID 6

#define Account_VT_NAME 8

#define Account_VT_KEY_TYPE 10

#define Account_VT_BALANCE 12

#define Account_VT_ADDRESS 14

#define Account_VT_SAVED 16

#define AccountVec_VT_ACCOUNTS 4

#define Balance_VT_SHIELDED 4

#define Balance_VT_UNCONFIRMED_SPENT 6

#define Balance_VT_UNDER_CONFIRMED 10

#define Balance_VT_EXCLUDED 12

#define Balance_VT_SAPLING 14

#define Balance_VT_ORCHARD 16

#define PoolBalance_VT_TRANSPARENT 4

#define Height_VT_HEIGHT 4

#define Height_VT_TIMESTAMP 6

#define ShieldedNote_VT_VALUE 8

#define ShieldedNote_VT_SPENT 16

#define ShieldedNoteVec_VT_NOTES 4

#define ShieldedTx_VT_TX_ID 6

#define ShieldedTx_VT_SHORT_TX_ID 10

#define ShieldedTx_VT_MEMO 20

#define ShieldedTx_VT_MESSAGES 22

#define ShieldedTxVec_VT_TXS 4

#define Message_VT_ID_MSG 4

#define Message_VT_ID_TX 6

#define Message_VT_SENDER 12

#define Message_VT_FROM 14

#define Message_VT_TO 16

#define Message_VT_SUBJECT 18

#define Message_VT_BODY 20

#define Message_VT_READ 22

#define Message_VT_INCOMING 24

#define Memo_VT_DIRECTION 4

#define MemoVec_VT_MEMOS 4

#define PrevNext_VT_PREV 4

#define PrevNext_VT_NEXT 6

#define SendTemplate_VT_TITLE 6

#define SendTemplate_VT_AMOUNT 10

#define SendTemplate_VT_FIAT_AMOUNT 12

#define SendTemplate_VT_FEE_INCLUDED 14

#define SendTemplate_VT_FIAT 16

#define SendTemplate_VT_INCLUDE_REPLY_TO 18

#define SendTemplateVec_VT_TEMPLATES 4

#define ContactVec_VT_CONTACTS 4

#define TxTimeValueVec_VT_VALUES 4

#define Quote_VT_PRICE 6

#define Spending_VT_RECIPIENT 4

#define AddressBalance_VT_INDEX 4

#define Backup_VT_SEED 6

#define Backup_VT_SK 10

#define Backup_VT_FVK 12

#define Backup_VT_UVK 14

#define Backup_VT_TSK 16

#define RaptorQDrops_VT_DROPS 4

#define RaptorQResult_VT_PROGRESS 4

#define RaptorQResult_VT_TOTAL 6

#define RaptorQResult_VT_DATA 8

#define AGEKeys_VT_PK 6

#define Servers_VT_URLS 4

#define Progress_VT_TRIAL_DECRYPTIONS 8

#define Progress_VT_DOWNLOADED 10

#define Progress_VT_BALANCES 12

#define KeyPack_VT_T_ADDR 4

#define KeyPack_VT_T_KEY 6

#define KeyPack_VT_Z_ADDR 8

#define KeyPack_VT_Z_KEY 10

#define Recipient_VT_POOLS 6

#define Recipient_VT_REPLY_TO 12

#define Recipient_VT_MAX_AMOUNT_PER_NOTE 18

#define UnsignedTxSummary_VT_RECIPIENTS 4

#define TxOutput_VT_POOL 10

#define TxReport_VT_OUTPUTS 4

#define TxReport_VT_NET_SAPLING 12

#define TxReport_VT_NET_ORCHARD 14

#define TxReport_VT_FEE 16

#define TxReport_VT_PRIVACY_LEVEL 18

#define Fee_VT_MIN_FEE 6

#define Fee_VT_MAX_FEE 8

#define Fee_VT_SCHEME 10

#define Swap_VT_PROVIDER 4

#define Swap_VT_PROVIDER_ID 6

#define Swap_VT_FROM_CURRENCY 10

#define Swap_VT_FROM_AMOUNT 12

#define Swap_VT_FROM_ADDRESS 14

#define Swap_VT_FROM_IMAGE 16

#define Swap_VT_TO_CURRENCY 18

#define Swap_VT_TO_AMOUNT 20

#define Swap_VT_TO_ADDRESS 22

#define Swap_VT_TO_IMAGE 24

#define VoteNote_VT_SELECTED 10

void dummy_export(void);

void dart_post_cobject(DartPostCObjectFnType ptr);

void deallocate_str(char *s);

void deallocate_bytes(uint8_t *ptr, uint32_t len);

struct CResult_u8 init_prover(uint8_t *spend_bytes,
                              uint64_t spend_len,
                              uint8_t *output_bytes,
                              uint64_t output_len);

struct CResult_u8 init_wallet(uint8_t coin, char *db_path);

struct CResult_u8 migrate_db(uint8_t coin, char *db_path);

struct CResult_u8 migrate_data_db(uint8_t coin);

void set_coin_lwd_url(uint8_t coin, char *lwd_url);

char *get_lwd_url(uint8_t coin);

void set_coin_passwd(uint8_t coin, char *passwd);

void mempool_run(int64_t port);

void mempool_set_active(uint8_t coin, uint32_t id_account);

struct CResult_u32 new_account(uint8_t coin, char *name, char *data, int32_t index);

struct CResult_u8 convert_to_watchonly(uint8_t coin, uint32_t id_account);

struct CResult______u8 get_backup(uint8_t coin, uint32_t id_account);

struct CResult_u8 set_backup_reminder(uint8_t coin, uint32_t id_account, bool v);

struct CResult_u8 get_available_addrs(uint8_t coin, uint32_t account);

struct CResult_____c_char get_address(uint8_t coin, uint32_t id_account, uint8_t ua_type);

void import_transparent_key(uint8_t coin, uint32_t id_account, char *path);

void import_transparent_secret_key(uint8_t coin, uint32_t id_account, char *secret_key);

void cancel_warp(void);

struct CResult_u8 warp(uint8_t coin,
                       uint32_t account,
                       bool get_tx,
                       uint32_t anchor_offset,
                       uint32_t max_cost,
                       int64_t port);

struct CResult_bool transparent_sync(uint8_t coin, uint32_t account, uint32_t height);

bool is_valid_seed(uint8_t coin, char *seed);

int8_t is_valid_key(uint8_t coin, char *key);

bool valid_address(uint8_t coin, char *address);

uint8_t receivers_of_address(uint8_t coin, char *address);

struct CResult_____c_char get_diversified_address(uint8_t coin,
                                                  uint32_t account,
                                                  uint8_t ua_type,
                                                  uint32_t time);

struct CResult_u32 get_latest_height(uint8_t coin);

struct CResult_u8 ledger_build_keys(void);

struct CResult_____c_char ledger_get_fvk(uint8_t coin);

struct CResult_____c_char ledger_get_address(void);

struct CResult_____c_char convert_t2_address(uint8_t coin, char *address, char *prefix, bool from);

void skip_to_last_height(uint8_t coin);

struct CResult_u32 rewind_to(uint8_t coin, uint32_t height);

struct CResult_u32 rescan_from(uint8_t coin, uint32_t height);

struct CResult_u64 get_taddr_balance(uint8_t coin, uint32_t id_account);

struct CResult_____c_char transfer_pools(uint8_t coin,
                                         uint32_t account,
                                         uint8_t from_pool,
                                         uint8_t to_pool,
                                         uint64_t amount,
                                         bool fee_included,
                                         char *memo,
                                         uint64_t split_amount,
                                         uint32_t confirmations,
                                         uint8_t *fee_bytes,
                                         uint64_t fee_len);

struct CResult_____c_char prepare_multi_payment(uint8_t coin,
                                                uint32_t account,
                                                uint8_t *recipients_bytes,
                                                uint64_t recipients_len,
                                                uint8_t pools,
                                                uint8_t sender_ua,
                                                uint32_t anchor_offset,
                                                uint8_t *fee_bytes,
                                                uint64_t fee_len);

struct CResult______u8 transaction_report(uint8_t coin, char *plan);

struct CResult_____c_char sign(uint8_t coin, uint32_t account, char *tx_plan, int64_t _port);

struct CResult_____c_char sign_and_broadcast(uint8_t coin, uint32_t account, char *tx_plan);

struct CResult_____c_char broadcast_tx(uint8_t coin, char *tx_str);

bool is_valid_tkey(char *sk);

struct CResult_____c_char sweep_tkey(uint8_t coin,
                                     uint32_t account,
                                     uint32_t last_height,
                                     char *sk,
                                     uint8_t pool,
                                     char *address,
                                     uint8_t *fee_bytes,
                                     uint64_t fee_len);

struct CResult_____c_char sweep_tseed(uint8_t coin,
                                      uint32_t account,
                                      uint32_t last_height,
                                      char *seed,
                                      uint8_t pool,
                                      char *address,
                                      uint32_t index,
                                      uint32_t limit,
                                      uint8_t *fee_bytes,
                                      uint64_t fee_len);

struct CResult_u32 get_activation_date(void);

struct CResult_u32 get_block_by_time(uint8_t coin, uint32_t time);

void store_contact(uint8_t coin, uint32_t id, char *name, char *address, bool dirty);

struct CResult_____c_char commit_unsaved_contacts(uint8_t coin,
                                                  uint32_t account,
                                                  uint8_t pools,
                                                  uint32_t anchor_offset,
                                                  uint8_t *fee_bytes,
                                                  uint64_t fee_len);

void mark_message_read(uint8_t coin, uint32_t message, bool read);

void mark_all_messages_read(uint8_t coin, uint32_t account, bool read);

void truncate_data(void);

void truncate_sync_data(void);

bool check_account(uint8_t coin, uint32_t account);

void delete_account(uint8_t coin, uint32_t account);

struct CResult_____c_char make_payment_uri(uint8_t coin,
                                           char *address,
                                           uint64_t amount,
                                           char *memo);

struct CResult______u8 decode_payment_uri(uint8_t coin, char *uri);

struct CResult______u8 generate_key(void);

struct CResult_u8 zip_backup(char *key, char *path, char *temp_dir);

struct CResult_____c_char decrypt_backup(char *key, char *path, char *temp_dir);

struct CResult_u8 unzip_backup(char *path, char *db_dir);

struct CResult_____c_char zip_dbs(char *passwd, char *temp_dir);

struct CResult______u8 split_data(uint32_t id, char *data);

struct CResult______u8 merge_data(char *drop);

struct CResult_____c_char get_tx_summary(char *tx);

void import_from_zwl(uint8_t coin, char *name, char *data);

struct CResult______u8 derive_zip32(uint8_t coin,
                                    uint32_t id_account,
                                    uint32_t account,
                                    uint32_t external,
                                    bool has_address,
                                    uint32_t address);

struct CResult_u8 clear_tx_details(uint8_t coin, uint32_t account);

struct CResult______u8 get_account_list(uint8_t coin);

struct CResult_u32 count_accounts(uint8_t coin);

struct CResult_u32 get_first_account(uint8_t coin);

struct CResult_____c_char get_t_addr(uint8_t coin, uint32_t id);

struct CResult_____c_char get_sk(uint8_t coin, uint32_t id);

struct CResult_u8 update_account_name(uint8_t coin, uint32_t id, char *name);

struct CResult______u8 get_balances(uint8_t coin, uint32_t id, uint32_t confirmed_height);

struct CResult______u8 get_pool_balances(uint8_t coin,
                                         uint32_t id,
                                         uint32_t confirmations,
                                         bool include_spent);

struct CResult______u8 get_db_height(uint8_t coin);

struct CResult______u8 get_notes(uint8_t coin, uint32_t id);

struct CResult______u8 get_txs(uint8_t coin, uint32_t id);

struct CResult______u8 get_messages(uint8_t coin, uint32_t id);

struct CResult______u8 get_prev_next_message(uint8_t coin,
                                             uint32_t id,
                                             char *subject,
                                             uint32_t height);

struct CResult______u8 get_templates(uint8_t coin);

struct CResult_u8 delete_send_template(uint8_t coin, uint32_t id);

struct CResult______u8 get_contacts(uint8_t coin);

struct CResult______u8 get_contact(uint8_t coin, uint32_t id);

struct CResult______u8 get_pnl_txs(uint8_t coin, uint32_t id, uint32_t timestamp);

struct CResult______u8 get_spendings(uint8_t coin, uint32_t id, uint32_t timestamp);

struct CResult_u8 update_excluded(uint8_t coin, uint32_t id, bool excluded);

struct CResult_u8 invert_excluded(uint8_t coin, uint32_t id);

struct CResult______u8 get_checkpoints(uint8_t coin);

struct CResult_bool decrypt_db(char *db_path, char *passwd);

struct CResult_u8 clone_db_with_passwd(uint8_t coin, char *temp_path, char *passwd);

struct CResult_____c_char get_property(uint8_t coin, char *name);

struct CResult_u8 set_property(uint8_t coin, char *name, char *value);

struct CResult_____c_char get_account_property(uint8_t coin, uint32_t account, char *name);

struct CResult_u8 set_account_property(uint8_t coin, uint32_t account, char *name, char *value);

struct CResult_____c_char parse_tex(uint8_t coin, char *address);

struct CResult_u32 ping(char *lwd_url);

struct CResult_u8 store_swap(uint8_t coin,
                             uint32_t account,
                             uint8_t *swap_bytes,
                             uint64_t swap_len);

struct CResult______u8 list_swaps(uint8_t coin);

struct CResult_u8 clear_swap_history(uint8_t coin);

struct CResult_____c_char ledger_send(uint8_t coin, char *tx_plan);

struct CResult_u32 ledger_import_account(uint8_t coin, char *name);

struct CResult_bool ledger_has_account(uint8_t coin, uint32_t account);

bool has_cuda(void);

bool has_metal(void);

bool has_gpu(void);

void use_gpu(bool v);
