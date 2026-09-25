/**
 * ─────────────────────────────────────────────────────────────────────────
 *  PRIVATE FULFILLMENT DATA — server only.
 * ─────────────────────────────────────────────────────────────────────────
 *  Supplier names, supplier SKUs, costs and notes live here, keyed by the
 *  public SKU in src/config/products.ts. The `server-only` import makes the
 *  build fail if any browser component ever imports this file, so none of
 *  it can leak onto the site.
 *
 *  Nothing on the storefront reads this yet. It's a home for the data an
 *  order-routing integration (or your own reference) will need. When you
 *  move to Shopify, the same information usually lives in your fulfillment
 *  app instead, and this file can stay empty.
 */
import "server-only";

export type FulfillmentRecord = {
  supplier: string;
  supplierSku: string;
  unitCost: number | null;
  leadTimeDays: string;
  notes?: string;
};

export const fulfillment: Record<string, FulfillmentRecord> = {
  "VEL-SYSTEM-BLK": { supplier: "", supplierSku: "", unitCost: null, leadTimeDays: "" },
  "VEL-KIT-BLK": { supplier: "", supplierSku: "", unitCost: null, leadTimeDays: "" },
  "VEL-MASK-BLK": { supplier: "", supplierSku: "", unitCost: null, leadTimeDays: "" },
  "VEL-POUCH-BLK": { supplier: "", supplierSku: "", unitCost: null, leadTimeDays: "" },
  "VEL-TOIL-BLK": { supplier: "", supplierSku: "", unitCost: null, leadTimeDays: "" },
  "VEL-CUBE-BLK": { supplier: "", supplierSku: "", unitCost: null, leadTimeDays: "" },
  "VEL-TECH-BLK": { supplier: "", supplierSku: "", unitCost: null, leadTimeDays: "" },
  "VEL-PLUG-BLK": { supplier: "", supplierSku: "", unitCost: null, leadTimeDays: "" },
  "VEL-TAG-BLK": { supplier: "", supplierSku: "", unitCost: null, leadTimeDays: "" },
};
