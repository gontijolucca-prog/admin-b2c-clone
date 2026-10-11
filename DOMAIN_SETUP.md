# Domínio custom — admin.techbody.pt → admin-b2c-clone.pages.dev

## Estado
- Pages project: `admin-b2c-clone` (`admin-b2c-clone.pages.dev`) — deploy ok.
- `techbody.pt` está no HostGator (nspro106.hostgator.com.br), **não** no Cloudflare — por isso `wrangler pages domain add` via API retorna `8000015 invalid TLD` (API só auto-verifica zonas Cloudflare).

## O que fazer (2 opções)

### Opção A — Recomendada: mover DNS para Cloudflare (1 clique)
1. No dashboard Cloudflare → Add site `techbody.pt` → Cloudflare dá 2 nameservers (`*.ns.cloudflare.com`).
2. No HostGator → trocar NS de `techbody.pt` para os da Cloudflare.
3. Depois: `wrangler` ou dashboard Pages → Custom Domains → Add `admin.techbody.pt` → verifica automaticamente.
4. CNAME já aponta: `admin.techbody.pt CNAME admin-b2c-clone.pages.dev`.

### Opção B — Sem mover DNS (manual)
1. Cloudflare Dashboard → Pages → `admin-b2c-clone` → Custom domains → Add `admin.techbody.pt`.
2. Cloudflare mostra TXT de verificação + pede CNAME no HostGator:
   - `CNAME admin -> admin-b2c-clone.pages.dev` (ou `A` se exigido)
3. Aguardar validação (até 24h). O Pages gera certificado Let's Encrypt automático.

## Tentativa via API
```bash
TOKEN=$(grep oauth_token ~/.wrangler/config/default.toml | cut -d'"' -f2)
curl -X POST https://api.cloudflare.com/client/v4/accounts/a2cff0602323a3b179fd8581371c603d/pages/projects/admin-b2c-clone/domains \
  -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
  -d '{"domain":"admin.techbody.pt"}'
# falha enquanto zona techbody.pt não estiver no Cloudflare
```

## Alternativa imediata já funcional
- `https://admin-b2c-clone.pages.dev` — link Cloudflare Pages permanente, sem config DNS.
- Para `admin-b2c.techbody.pt` (original) manter separado; clone fica em `admin-b2c-clone.pages.dev` até DNS migrado.

## Após migrar, redeploy não é necessário — Pages vincula domínio ao último deploy.
