## Demo checklist

1. Start the backend on port 5000.
2. Open `/`.
3. Test Translator with:
   - Are you coming tomorrow?
   - Where is the nearest railway station?
   - Hello
4. Change domain/tone/style and translate again.
5. Test Conversation.
6. Test Speech. Chrome/Edge can use the browser microphone; other browsers use the demo fallback.
7. Upload an image to see the real preview and simulated OCR.
8. Upload a document to see the processing pipeline.
9. Save a translation, then check History and Saved.
10. Use Settings and the Sign in dialog.

## Production TODO

- Replace demo provider methods with real AI APIs.
- Add MongoDB persistence to all history/saved/conversation flows.
- Add signed upload URLs/object storage for large files.
- Add server-side authorization to all user-owned resources.
- Add CSRF/session strategy appropriate to deployment.
- Add tests and observability.
