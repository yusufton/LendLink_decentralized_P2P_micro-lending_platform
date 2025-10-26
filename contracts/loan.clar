;; P2P Lending Contract
(use-trait ft .sip010-trait.sip010-ft-trait)

;; Error constants
(define-constant ERR-NOT-FOUND u400)
(define-constant ERR-NOT-BORROWER u401)
(define-constant ERR-ALREADY-FUNDED u402)
(define-constant ERR-NOT-FUNDED u403)
(define-constant ERR-NOT-DUE u404)
(define-constant ERR-ALREADY-SETTLED u405)
(define-constant ERR-INSUFFICIENT u406)
(define-constant ERR-BAD-PARAMS u407)
(define-constant ERR-ORACLE-MISS u408)

;; Constants
(define-constant BPS u10000)

;; Data variables
(define-data-var last-loan-id uint u0)


;; Maps
(define-map loans
  { id: uint }
  {
    borrower: principal,
    lender: (optional principal),
    principal-token: principal,
    principal-amount: uint,
    interest-bps: uint,
    duration: uint,           ;; in blocks
    start-block: (optional uint),
    due-block: (optional uint),
    collateral-token: principal,
    collateral-amount: uint,
    settled: bool
  }
)


;; Read-only functions
(define-read-only (get-loan (id uint))
  (ok (map-get? loans { id: id }))
)

;; Private functions
(define-private (calc-interest (amount uint) (bps uint))
  (/ (* amount bps) BPS)
)

(define-private (escrow-collateral (token <ft>) (from principal) (amount uint))
  (as-contract (contract-call? token transfer amount from (as-contract tx-sender) none))
)

(define-private (release-collateral (token <ft>) (to principal) (amount uint))
  (as-contract (contract-call? token transfer amount (as-contract tx-sender) to none))
)

(define-private (pay (token <ft>) (from principal) (to principal) (amount uint))
  (as-contract (contract-call? token transfer amount from to none))
)


;; Public functions
(define-public (create-loan
  (principal-token <ft>)
  (principal-amount uint)
  (interest-bps uint)
  (duration uint)
  (collateral-token <ft>)
  (collateral-amount uint)
)
  (begin
    (asserts! (> principal-amount u0) (err ERR-BAD-PARAMS))
    (asserts! (> duration u0) (err ERR-BAD-PARAMS))
    (asserts! (> collateral-amount u0) (err ERR-BAD-PARAMS))
    (try! (escrow-collateral collateral-token tx-sender collateral-amount))
    (var-set last-loan-id (+ u1 (var-get last-loan-id)))
    (let ((id (var-get last-loan-id)))
      (map-set loans 
        { id: id }
        {
          borrower: tx-sender,
          lender: none,
          principal-token: (contract-of principal-token),
          principal-amount: principal-amount,
          interest-bps: interest-bps,
          duration: duration,
          start-block: none,
          due-block: none,
          collateral-token: (contract-of collateral-token),
          collateral-amount: collateral-amount,
          settled: false
        }
      )
      (ok id)
    )
  )
)