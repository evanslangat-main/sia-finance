import requests

"""
External Financial APIs
"""


# =========================
# CRYPTO PRICES
# =========================

def get_crypto_prices():

    try:

        url = (
            "https://api.coingecko.com/api/v3/simple/price"
        )

        params = {
            "ids": "bitcoin,ethereum",
            "vs_currencies": "usd",
        }

        response = requests.get(
            url,
            params=params,
            timeout=10
        )

        data = response.json()

        return {

            "bitcoin":
                data.get("bitcoin", {}).get("usd", 0),

            "ethereum":
                data.get("ethereum", {}).get("usd", 0),
        }

    except Exception as e:

        print("Crypto API Error:", e)

        return {
            "bitcoin": 0,
            "ethereum": 0,
        }


# =========================
# EXCHANGE RATES
# =========================

def get_exchange_rates():

    try:

        url = (
            "https://open.er-api.com/v6/latest/USD"
        )

        response = requests.get(
            url,
            timeout=10
        )

        data = response.json()

        return {

            "USD_KES":
                data.get("rates", {}).get("KES", 0)
        }

    except Exception as e:

        print("Exchange API Error:", e)

        return {
            "USD_KES": 0
        }