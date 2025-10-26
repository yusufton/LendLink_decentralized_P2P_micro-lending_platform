;; Price Oracle Contract
;; Provides price feeds for different tokens

;; Error constants
(define-constant ERR-NOT-AUTH u200)

;; Data variables
(define-data-var publisher principal tx-sender)

;; Maps
(define-map prices 
  { sym: (string-ascii 16) } 
  { price: uint, decimals: uint }
)

;; Read-only functions
(define-read-only (get-price (symbol (string-ascii 16)))
  (ok (map-get? prices { sym: symbol }))
)

;; Public functions
(define-public (set-price (symbol (string-ascii 16)) (price uint) (decimals uint))
  (begin
    (asserts! (is-eq tx-sender (var-get publisher)) (err ERR-NOT-AUTH))
    (map-set prices { sym: symbol } { price: price, decimals: decimals })
    (ok true)
  )
)