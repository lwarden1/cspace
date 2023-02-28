-- CreateTable
CREATE TABLE "User" (
    "uid" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "isTeacher" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "Class" (
    "uid" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "teacherUid" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "start" DATETIME NOT NULL,
    "end" DATETIME NOT NULL,
    "days" TEXT NOT NULL,
    CONSTRAINT "Class_teacherUid_fkey" FOREIGN KEY ("teacherUid") REFERENCES "User" ("uid") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_StudentsClasses" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_StudentsClasses_A_fkey" FOREIGN KEY ("A") REFERENCES "Class" ("uid") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_StudentsClasses_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("uid") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_StudentsWaitlists" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_StudentsWaitlists_A_fkey" FOREIGN KEY ("A") REFERENCES "Class" ("uid") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_StudentsWaitlists_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("uid") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_StudentsCarts" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_StudentsCarts_A_fkey" FOREIGN KEY ("A") REFERENCES "Class" ("uid") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_StudentsCarts_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("uid") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Class_id_key" ON "Class"("id");

-- CreateIndex
CREATE UNIQUE INDEX "_StudentsClasses_AB_unique" ON "_StudentsClasses"("A", "B");

-- CreateIndex
CREATE INDEX "_StudentsClasses_B_index" ON "_StudentsClasses"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_StudentsWaitlists_AB_unique" ON "_StudentsWaitlists"("A", "B");

-- CreateIndex
CREATE INDEX "_StudentsWaitlists_B_index" ON "_StudentsWaitlists"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_StudentsCarts_AB_unique" ON "_StudentsCarts"("A", "B");

-- CreateIndex
CREATE INDEX "_StudentsCarts_B_index" ON "_StudentsCarts"("B");
