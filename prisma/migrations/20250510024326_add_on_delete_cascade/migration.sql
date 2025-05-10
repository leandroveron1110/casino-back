-- DropForeignKey
ALTER TABLE "TournamentPrize" DROP CONSTRAINT "TournamentPrize_prizeId_fkey";

-- DropForeignKey
ALTER TABLE "TournamentPrize" DROP CONSTRAINT "TournamentPrize_tournamentId_fkey";

-- DropForeignKey
ALTER TABLE "TournamentUser" DROP CONSTRAINT "TournamentUser_tournamentId_fkey";

-- DropForeignKey
ALTER TABLE "TournamentUser" DROP CONSTRAINT "TournamentUser_userId_fkey";

-- AddForeignKey
ALTER TABLE "TournamentUser" ADD CONSTRAINT "TournamentUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TournamentUser" ADD CONSTRAINT "TournamentUser_tournamentId_fkey" FOREIGN KEY ("tournamentId") REFERENCES "Tournament"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TournamentPrize" ADD CONSTRAINT "TournamentPrize_tournamentId_fkey" FOREIGN KEY ("tournamentId") REFERENCES "Tournament"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TournamentPrize" ADD CONSTRAINT "TournamentPrize_prizeId_fkey" FOREIGN KEY ("prizeId") REFERENCES "Prize"("id") ON DELETE CASCADE ON UPDATE CASCADE;
