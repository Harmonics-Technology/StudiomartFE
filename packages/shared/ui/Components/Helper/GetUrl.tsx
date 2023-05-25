import React from 'react'

function getUrlRoute() {
    const clientUrl = process.env.NEXT_PUBLIC_CLIENT_URL;
    const vendorUrl = process.env.NEXT_PUBLIC_VENDOR_URL;
    if (!clientUrl || clientUrl.length === 0) {
      throw new Error("Missing Client Url");
    }
    if (!vendorUrl || vendorUrl.length === 0) {
      throw new Error("Missing Vendor Url");
    }
    return { clientUrl, vendorUrl };
  }

export default getUrlRoute