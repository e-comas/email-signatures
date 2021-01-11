# Create email signature from template

1. Ask user to fill-in template in
   https://docs.google.com/document/d/1fGE2MU0CrxxRaC-YrvPzk-3aqOsqfcIVQPOeFmkmMTI/edit
1. Ask for a squarish picture
1. Pass the picture to https://squoosh.app/ or similar to get a ≤15kiB JPEG
   file.
1. Run the `createZip.mjs` script and paste the filled-in template in step #1
   (end with Ctrl+D).

```
./createZip.mjs template.html squooshed-picture.jpg | sh
```

### Dependencies

- POSIX shell (`sh`, `bash`, etc.)
- Node.js 14+
- POSIX utilities (`/usr/bin/file`, `sed`, `zip`)
