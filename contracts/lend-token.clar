;; LendUSD Token Contract - SIP-010 Compatible Fungible Token
(impl-trait .sip010-trait.sip010-ft-trait)

;; Error constants
(define-constant ERR-NOT-AUTH u100)
(define-constant ERR-ALREADY-BOOTSTRAPPED u101)
(define-constant ERR-INSUFFICIENT u102)

;; Data variables
(define-data-var owner principal tx-sender)
(define-data-var bootstrapped bool false)
(define-data-var total-supply uint u0)

;; Maps
(define-map balances { who: principal } { bal: uint })

;; Token constants
(define-constant DECIMALS u6)
(define-constant NAME "LENDUSD")
(define-constant SYMBOL "LUSD")

;; SIP-010 Read-only functions
(define-read-only (get-decimals)
  (ok DECIMALS)
)

(define-read-only (get-symbol)
  (ok SYMBOL)
)

(define-read-only (get-name)
  (ok NAME)
)

(define-read-only (get-token-uri)
  (ok none)
)

(define-read-only (get-total-supply)
  (ok (var-get total-supply))
)

(define-read-only (get-balance (account principal))
  (ok (default-to u0 (get bal (map-get? balances { who: account }))))
)


;; Private functions
(define-private (only-owner)
  (begin
    (asserts! (is-eq tx-sender (var-get owner)) (err ERR-NOT-AUTH))
    (ok true)
  )
)

;; Public functions
(define-public (bootstrap (amount uint))
  (begin
    (try! (only-owner))
    (asserts! (not (var-get bootstrapped)) (err ERR-ALREADY-BOOTSTRAPPED))
    (var-set bootstrapped true)
    (map-set balances { who: tx-sender } { bal: amount })
    (var-set total-supply (+ (var-get total-supply) amount))
    (ok true)
  )
)

(define-public (mint (amount uint) (recipient principal))
  (begin
    (try! (only-owner))
    (map-set balances 
      { who: recipient }
      { bal: (+ amount (default-to u0 (get bal (map-get? balances { who: recipient })))) }
    )
    (var-set total-supply (+ (var-get total-supply) amount))
    (ok true)
  )
)

(define-public (burn (amount uint) (sender principal))
  (let ((bal (default-to u0 (get bal (map-get? balances { who: sender })))))
    (asserts! (>= bal amount) (err ERR-INSUFFICIENT))
    (map-set balances { who: sender } { bal: (- bal amount) })
    (var-set total-supply (- (var-get total-supply) amount))
    (ok true)
  )
)

(define-public (transfer (amount uint) (sender principal) (recipient principal) (memo (optional (buff 34))))
  (let ((bal (default-to u0 (get bal (map-get? balances { who: sender })))))
    (asserts! (>= bal amount) (err ERR-INSUFFICIENT))
    (map-set balances { who: sender } { bal: (- bal amount) })
    (map-set balances 
      { who: recipient }
      { bal: (+ amount (default-to u0 (get bal (map-get? balances { who: recipient })))) }
    )
    (ok true)
  )
)