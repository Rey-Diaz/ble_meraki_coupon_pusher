from pyngrok import ngrok

public_url = ngrok.connect(8000)
print(f"Public ngrok URL: {public_url}")
