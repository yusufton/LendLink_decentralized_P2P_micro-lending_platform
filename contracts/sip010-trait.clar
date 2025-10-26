;; SIP-010 Fungible Token Trait
;; Standard interface for fungible tokens on Stacks

(define-trait sip010-ft-trait
  (
    ;; Transfer tokens from sender to recipient
    (transfer (uint principal principal (optional (buff 34))) (response bool uint))
    
    ;; Get balance for a given principal
    (get-balance (principal) (response uint uint))
    
    ;; Get total token supply
    (get-total-supply () (response uint uint))
    
    ;; Get token decimals
    (get-decimals () (response uint uint))
    
    ;; Get token symbol
    (get-symbol () (response (string-ascii 32) uint))
    
    ;; Get token name
    (get-name () (response (string-ascii 32) uint))
    
    ;; Get token URI (optional)
    (get-token-uri () (response (optional (string-utf8 256)) uint))
    
    ;; Mint tokens
    (mint (uint principal) (response bool uint))
    
    ;; Burn tokens
    (burn (uint principal) (response bool uint))
  )
)