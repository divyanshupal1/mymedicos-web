import admin from 'firebase-admin';

admin.apps.length === 0 && admin.initializeApp({
    credential : admin.credential.cert( {
        "type": "service_account",
        "project_id": "mymedicosupdated",
        "private_key_id": "e957d5897eb9faff121a8a56daccd17267ce1967",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDmCKa1mFIYJBlV\n+uQOrRIJv5Vtu4NTMrgZnDlvM1+BdrPHWWTGNpvGS5FW6DsKICC/7vpOwGMFOTxa\n2PVceSaQB451Z26krBny62Z6KZYO7fS8ELIcbYkKG1c/OjFb/lH/jyE6jpxRcXY9\nt0O3YqXOCQCgSN9yIFqfT2NjW56BTFb2D4MWbcrZYmdkIrizaE8I3IPaYwLNdaCO\njnd3RbyQF40XHf0+w2GSW+jS4KEESK0+fET7U7IPtke/e6lEAq58m2Bs5vBpPQvk\nH8mWS/wSQxXe29wl30VFsa0jkCs33NWXokOHWQoMkebfom7g3/5E9112enlkdhXu\noRbO+cXfAgMBAAECggEANYvq/peT+JGioiySXMY1zjYeGxqModfLGg8PIY8EWtce\nVze8aRV6ImkhzmiloaBD71m6Q42uHx+pKH6bcuiyrNFNfI/Uphl3ut/IDYTTrOsA\nTqzWQR7QSR1/LDUoG0FypfoT4pUi1ySBwTEBXtVkQjc/QZBlDyRv4+iveofvuCnz\ngUgICctKbi+P0vwwMJnHSyG34dkIo4n1+HJimaOyR4w+QOxiu+DhQ4e14j9zZ1q8\n7RxrsVuld3bpeuluGWIGHictl/f3fX+v6GzsIBlyrhy2S+58kKN5hgz/M1hI0wxZ\niqMxM5oFq6hlo+iPREAvrZe8UxZRizTxiYMENxJTJQKBgQD7jIIjvsE4CVGkB8XF\nykgaiZZG3u/wbPXLCIjSEYvHxKqzGFj8QD/rh8smlyOAy3g0BS+cxKdEhvxiLXja\nDcVzbtEHsmBvVwWQDroMbvlDeVv1Pd0WBs6EZ9cVByUK+qCaUxtYPlnuNpOiVS5Y\nu6++Kzszl+rYiqVPhUA42YA/jQKBgQDqGq6Ega3t0Muq+jqC/GyeTURs90XBX+kM\nu+hhKF7lel+W8c/51S4v2TrxZ6x8MUtN9Py7t3PNy6RK2HvMjiS9MdSnftF02vRY\nXYsM2pMjVKx9BZD+ZvQwjzXNW/e88ydDKcy0cuckIYoWyok+g8ZBZXfmh+cFTOyC\neaWBVenaGwKBgQCgt1UuoWGx+8I9mvmxNVx8GAv7m9SROAySfBFupec4615krtmr\n0SEFyuzw6v+z+kwCcI3LC5oTHmuCDqt4JfRRnCvRTxZuDJtxPvd/mieIBLHMLopi\n2FZ6Ih45QSdZrGeQMij2aF/s4tHQlbvW1ZOjXNumSxmw4GReOjSeHdjiwQKBgQCu\n1gh6O6NbFfHVmpXyV3UDcO9mdfHprqiNcxTk4tKkjZUwVR4fFsAsyg7EVcoy4lm8\nOfg6dZMOIkVsBGvI5Gu5xKpuAT+LBy8vg4Uir2buHwHHSU31QYyja4EiAsptmic7\neM9CAQJxMH9B8Dc5sg5xrscyK1M02TNVamZZxoEk+wKBgAG+YG7Y5g6P98GlRI1F\nbEowkrChadL2w9GFM83wmcLqxV3HVIlYYZDz0ef1YmrhtpQhmlyMKEVSxOyiEti0\n2+tPFr/zeVKvs7V/48NBLvt6Zps4A3b4yOTOrH1mdHf/gAgbVUTWW7UegVQMNaIR\nPzDDsPKYRkwuLxcSp3qiPXZi\n-----END PRIVATE KEY-----\n",
        "client_email": "firebase-adminsdk-dbf2t@mymedicosupdated.iam.gserviceaccount.com",
        "client_id": "116474594684036203804",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-dbf2t%40mymedicosupdated.iam.gserviceaccount.com",
        "universe_domain": "googleapis.com"
    })
});

export default admin;