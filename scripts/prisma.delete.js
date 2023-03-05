const path = require('path');
const fs = require('fs-extra');
const ops = {
    rmSync: {
        "./prisma/migrations": { recursive: true, force: true },
        "./prisma/dev.db": { recursive: true, force: true },
        "./prisma/dev.db-journal": { recursive: true, force: true },
    }
}
Object.entries(ops).forEach(([src, dest]) => {
    const op = fs[src];
    Object.entries(dest).forEach(([k, v]) => {
        op(path.resolve(k), v);
    });
});
console.log(`${__filename} completed`);
