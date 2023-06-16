import { server$ } from "@builder.io/qwik-city";
import '@shopify/shopify-api/adapters/node';
import { shopifyApi, LATEST_API_VERSION } from '@shopify/shopify-api';

export function useShopify() {
    const getProducts = server$(async function () {
        const apiKey = this.env.get('SHOPIFY_KEY');
        const apiSecretKey = this.env.get('SHOPIFY_SECRET');

        if (!apiKey || !apiSecretKey) {
        throw new Error('Shopify API key and secret are required.');
}
        const shopify = shopifyApi({
            // The next 4 values are typically read from environment variables for added security            apiKey,
            apiSecretKey,
            scopes: ['read_products'],
            hostName: 'ngrok-tunnel-address',
            apiVersion: LATEST_API_VERSION,
            isEmbeddedApp: false
        });

        const products = await shopify.rest.products;
        return products;
    });

    return {
        getProducts,
    };
}
