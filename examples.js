export default
{
    "pixels": [
      {
        "name": "Gyroscope",
        "author": "Alex",
        "source": "TYPE 0;\ndock, -150, 0, 0, 200, 200;\nrectangle, 0, 0, 0, 200, 200, 1;\ndetail;\nline, 0, -200, 0, 0, 200, 0;\ndetail;\nellipse, 0, 0, 0, 300, 300, 0, 4, EAST-WEST VERT. CIRCLE;\nellipse, 0, 0, 0, 300, 300, 1, 4, HORIZONTAL CIRCLE;\nellipse, 0, 0, 0, 300, 300, 2, 4, NORTH-SOUTH VERT. CIRCLE;\nrectangle, 0, -200, 0, 20, 20, 1, UPPER SQUARE;\nrectangle, 0, 200, 0, 20, 20, 1, LOWER SQUARE;\ndetail;\ndotted ellipse, 0, 0, 0, 50, 50, 0, 10, CIRCULAR THINGY 1;\ndotted ellipse, 0, 0, 0, 50, 50, 1, 10, CIRCULAR THINGY 2;\ndotted ellipse, 0, 0, 0, 50, 50, 2, 10, CIRCULAR THINGY 3;\ntext, -15, 200, -15, 0.8, -1, 90, 0, GYROSCOPE;\ntext, -180, 0, -180, 3, -3, 90, 0, DOCK_HERE_PLEASE;\ntext, -15, -200, 0, 1, -1, 90, 0, %d;\ntotal mass, 40000;\nendpixel;"
      },
      {
        "name": "Deck",
        "author": "Alex",
        "source": "TYPE 1;\ndock, 0, -10, 0, 150, 150;\nbox, 0, 0, 0, 150, 10, 150, SURFACE;\ndetail;\ndetail;\ndotted ellipse, 0, 0, 0, 250, 250, 1, 2, RING;\ndetail;\ntext, -140, -10, -130, 3, 3, 270, 0, DOCK_HERE_PLEASE;\ntext, -140, 0, -150, 2, 2, 0, 0, %d;\ntext, 90, 0, -150, 2, 2, 0, 0, DECK;\ntotal mass, 30000;\nendpixel;"
      },
      {
        "name": "Foh",
        "author": "Alex",
        "source": "TYPE 2;\ndock, 85, 0, 85, 200, 200;\nrectangle, 0, 0, 0, 200, 200, 1, SURFACE;\ndetail;\nline, -200, 0, -200, -100, 50, -100, L1;\nline, -100, 50, -100, 0, 0, 0, L2;\nline, 0, 0, 0, -200, 0, 0, L3;\nline, -200, 0, 0, -100, 50, -100, L4;\nline, -100, 50, -100, 0, 0, -200, L5;\nline, 0, 0, -200, 0, 0, 0, L6;\nline, 0, 0, 0, -100, -50, -100, L7;\nline, -100, -50, -100, -200, 0, -200, L8;\nline, -200, 0, 0, -100, -50, -100, L9;\nline, -100, -50, -100, 0, 0, -200, L10;\ndetail;\ndetail;\ntext, 180, 0, -190, 3, 3, 270, 90, EREH_KCOD;\ntext, -108, -10, -100, 6, 6, 0, 0, %d;\ntext, -108, 20, -100, 3, 3, 0, 0, FOH;\ntotal mass, 30000;\nendpixel;"
      },
      {
        "name": "Bubble",
        "author": "Alex",
        "source": "TYPE 3;\ndock, 0, 0, 0, 200, -1;\ngridsphere, 0, 0, 0, 200, 1, 24;\ndetail;\ndotted ellipse, 0, 0, 0, 200, 200, 1, 1;\ndetail;\ndetail;\ntext, -30, -220, 0, 3, 3, 0, 0, BUBBLE;\ntext, -8, 220, 0, 3, 3, 0, 0, %d;\ntotal mass, 30000;\nendpixel;"
      },
      {
        "name": "Spiral",
        "author": "Alex",
        "source": "TYPE 4;\ndock, 0, 0, 0, 575, -1;\nspiral, 0, 0, 0, 8, 1, 15;\ndetail;\ndetail;\ndetail;\ntext, -30, 30, 0, 2, 2, 270, 0, SPIRAL(%d);\ntotal mass, 50000;\nendpixel;"
      },
      {
        "name": "Nonsense",
        "author": "Alex",
        "source": "TYPE 5;\ndock, 0, 0, 0, 120, 120;\nrectangle, 0, 0, 0, 120, 120, 1;\nline, -120, 0, -120, 0, 120, 0, L1;\nline, 120, 0, -120, 0, 120, 0, L2;\nline, -120, 0, 120, 0, 120, 0, L3;\nline, 240, -120, 240, 0, 120, 0, L4;\ndetail;\nline, 240, -120, 240, 50, -120, 50, L5;\ndetail;\nrectangle, 0, -120, 0, 50, 50, 1;\ndetail;\ndot, 34, -120, 22, P1;\ndot, 45, -120, -3, P2;\ndot, 5, -120, -15, P3;\ndot, 20, -120, 35, P4;\ndot, 35, -120, 40, P5;\ndot, 40, -120, 5, P6;\ndot, -40, -120, -20, P7;\ndot, -10, -120, -25, P8;\ndot, 10, -120, -5, P9;\ndot, 0, -120, 0, P10;\ntext, 40, -120, -40, 1, 1, 270, 180, N_O_N_S_E_N_S_E;\ntext, 12, -120, 0, 3, 3, 270, 180, %d;\ntext, -70, 0, -70, 3, 3, 270, 45, E_R_E_H_K_C_O_D;\ntotal mass, 20000;\nendpixel;"
      },
      {
        "name": "200 Lire",
        "author": "Alex",
        "source": "TYPE 6;\ndock, 0, -6, 0, 100, -1;\ncolumn, 0, 0, 0, 100, 100, 12, 5;\ndetail;\ndetail;\ndetail;\ntext, -50, -6, 15, 12, 12, 270, 0, 200;\ntext, -35, -6, -40, 6, 6, 270, 0, LIRE;\ntext, -18, -6, -83, 3, 3, 270, 0, 1994;\ntext, -61, -6, -61, 1, 1, 270, 0, %d;\nline, -65, -6, -70, 65, -6, -70;\ntotal mass, 25000;\nendpixel;"
      },
      {
        "name": "Conule",
        "author": "Alex",
        "source": "TYPE 7;\ndock, 0, 0, 0, 150, -1;\ncolumn, 0, 50, 0, 15, 150, 100, 9;\ndetail;\nline, 0, 0, 100, 0, -200, 100;\ndetail;\nline, -50, -200, 50, 50, -200, 50;\nline, 0, -200, 150, -50, -200, 50;\nline, 0, -200, 150, 50, -200, 50;\ndetail;\ntext, -100, 0, 15, 4, 4, 270, 0, DOCKING_ZONE;\ntext, -35, 0, -40, 2, 2, 270, 0, (CONULE);\ntext, 0, 0, 40, 1, 1, 270, 0, %d;\ntotal mass, 35000;\nendpixel;"
      },
      {
        "name": "Ordinary",
        "author": "Alex",
        "source": "TYPE 8;\ndock, 0, -50, 0, 360, 360;\nbox, 0, 0, 0, 120, 50, 120, B1;\ndetail;\nbox, -240, 0, 0, 120, 30, 120, B2;\nbox, 240, 0, 0, 120, 30, 120, B3;\nbox, 0, 0, 240, 120, 30, 120, B4;\nbox, 0, 0, -240, 120, 30, 120, B5;\ndetail;\nbox, -240, 0, -240, 120, 10, 120, B6;\nbox, 240, 0, 240, 120, 10, 120, B7;\nbox, -240, 0, 240, 120, 10, 120, B8;\nbox, 240, 0, -240, 120, 10, 120, B9;\ndetail;\ncollision, 0, 0, 0, 120, 50, 120, ZC-1;\ncollision, -240, 0, 0, 120, 30, 120, ZC-2;\ncollision, 240, 0, 0, 120, 30, 120, ZC-3;\ncollision, 0, 0, 240, 120, 30, 120, ZC-4;\ncollision, 0, 0, -240, 120, 30, 120, ZC-5;\ncollision, -240, 0, -240, 120, 10, 120, ZC-6;\ncollision, 240, 0, 240, 120, 10, 120, ZC-7;\ncollision, -240, 0, 240, 120, 10, 120, ZC-8;\ncollision, 240, 0, -240, 120, 10, 120, ZC-9;\ntext, -50, -50, -40, 4, 4, 270, 0, ORDINARY;\ntext, 0, -50, 40, 1, 1, 270, 0, %d;\ntotal mass, 50000;\nendpixel;"
      },
      {
        "name": "Cublin",
        "author": "Alex",
        "source": "TYPE 9;\ndock, 0, -50, 0, 50, 50;\nline, -100, -100, -100, -50, -50, -50, L1 - \"RAYS\";\nline, 100, -100, -100, 50, -50, -50, L2;\nline, 100, 100, -100, 50, 50, -50, L3;\nline, 100, 100, 100, 50, 50, 50, L4;\nline, 100, -100, 100, 50, -50, 50, L5;\nline, -100, -100, 100, -50, -50, 50, L6;\nline, -100, 100, 100, -50, 50, 50, L7;\nline, -100, 100, -100, -50, 50, -50, L8;\ndetail;\nbox, 0, 0, 0, 50, 50, 50, CUBE AND SURFACE;\ndetail;\nrectangle, 0, -325, 0, 100, 25, 0, \"SIGNPOST\";\nline, 0, 0, 50, 0, 0, 100, PL1 - \"SUPPORT\";\nline, 0, 0, 100, 0, -200, 100, PL2 - \"SUPPORT\";\nline, 0, -200, 100, 0, -200, 0, PL3 - \"SUPPORT\";\nline, 0, -200, 0, 0, -300, 0, PL4 - \"SUPPORT\";\ndetail;\ntext, -40, -325, 0, 4, 4, 0, 0, CUBLIN;\ntext, -22, 0, 0, 9, 9, 0, 0, %d;\ntotal mass, 25000;\nendpixel;"
      },
      {
        "name": "Place",
        "author": "Alex",
        "source": "TYPE 10;\ndock, 0, 250, 0, 250, 250;\nbox, 0, 0, 0, 250, 250, 250, INTERNAL BOX;\nbox, 0, 0, 0, 260, 260, 260, EXTERNAL BOX;\ndetail;\ndetail;\ncolumn, 0, 35, 0, 150, 100, 430, 15;\ncolumn, 0, -215, 0, 10, 220, 70, 30;\ndetail;\nline, -200, -250, -200, -200, 250, -200;\nline, 200, -250, -200, 200, 250, -200;\nline, 200, -250, 200, 200, 250, 200;\nline, -200, -250, 200, -200, 250, 200;\ntext, -60, -250, 0, 8, 8, 270, 0, PLACE;\ntext, -8, 250, 0, 2, 2, 270, 0, %d;\ntotal mass, 60000;\nendpixel;"
      },
      {
        "name": "Startree",
        "author": "Alex",
        "source": "TYPE 11;\ndock, -200, -10, -50, 300, 150;\nbox, 0, 0, 0, 300, 10, 150;\ndetail;\ncolumn, 0, -60, 0, 5, 1, 100, 36;\ndetail;\nasterisk, 0, -110, 0, 50, 18;\ndetail;\nbox, 250, -20, 100, 25, 10, 5;\ncollision, 250, -20, 100, 25, 10, 5, 0;\ntext, 240, -20, 100, 2, 2, 0, 0, %d;\ntext, -24, 0, -150, 1, 2, 0, 0, STARTREE;\ntext, 300, 0, -24, 1, 2, 0, 90, EERTRATS;\ntext, -24, 0, 150, 1, 2, 0, 180, STARTREE;\ntext, -300, 0, -24, 1, 2, 0, 270, EERTRATS;\ntotal mass, 50000;\nendpixel;"
      },
      {
        "name": "Home Sweet Pixel",
        "author": "Alex",
        "source": "TYPE 12;\ndock, 80, 0, -80, 200, 200;\nbox, 0, 1, 0, 200, 1, 200, FLAT SURFACE;\nbox, -150, -110, 0, 25, 5, 50, BALCONY;\ncollision high, -150, -110, 0, 25, 5, 51, BALCONY AREA;\ndetail;\nbox, -150, -60, -75, 25, 60, 25, LITTLE COLUMN;\nbox, -150, -90, 55, 10, 90, 5, column 1;\nbox, -150, -120, 65, 10, 120, 5, column 2;\nbox, -150, -150, 75, 10, 150, 5, column 3;\nbox, -150, -180, 85, 10, 180, 5, column 4;\nbox, -150, -210, 95, 10, 210, 5, column 5;\nbox, -150, -240, 105, 10, 240, 5, column 6;\nbox, -150, -270, 115, 10, 270, 5, column 7;\nbox, -150, -535, 145, 25, 5, 25, HIGH BALCONY;\nbox, -150, -50, -150, 50, 50, 50, BIG BLOCK;\ndetail;\nbox, -75, -25, -150, 25, 25, 25, MEDIUM BLOCK;\nbox, -38, -12, -150, 12, 12, 12, SMALL BLOCK;\ndetail;\nasterisk, 150, -5, 150, 5, 36;\nline, -199, -1, 199, -199, -48.5, 199, SUPPORT 1;\nline, -150, -1, 150, -150, -49, 150, SUPPORT 2;\ntext, -200, -50, 199, 0.33, 0.33, 0, 0, %d;\nrectangle, -199, -50, 199, 4, 1.5, 0, SIGNPOST;\ntext, -152, -50, 150, 0.5, 0.5, 330, 0, SOLO;\ncollision, -150, -60, -75, 25, 60, 25, ZC1;\ncollision, -150, -50, -150, 50, 50, 50, ZC2;\ncollision, -75, -25, -150, 25, 25, 25, ZC3;\ncollision, -38, -12, -150, 12, 12, 12, ZC4;\ncollision, -150, -90, 55, 10, 90, 5, ZC5;\ncollision, -150, -120, 65, 10, 120, 5, ZC6;\ncollision, -150, -150, 75, 10, 150, 5, ZC7;\ncollision, -150, -180, 85, 10, 180, 5, ZC8;\ncollision, -150, -210, 95, 10, 210, 5, ZC9;\ncollision, -150, -240, 105, 10, 240, 5, ZC8;\ncollision, -150, -270, 115, 10, 270, 5, ZC9;\ncollision high, -150, -535, 145, 25, 5, 25, ZC10;\nassociated file, nebula;\ntotal mass, 40000;\nendpixel;"
      },
      {
        "name": "Congratulations",
        "author": "Alex",
        "source": "TYPE 13;\ndock, 0, 0, 0, 125, 125;\ngrid, 0, 0, 0, 50, 50, 5, 1, FLOOR;\ndetail;\ncolumn, 0, 150, 0, 0, 30, 300, 36;\ndetail;\ncolumn, 100, 25, 100, 0, 10, 50, 36;\ncolumn, -100, 25, 100, 0, 10, 50, 36;\ncolumn, 100, 25, -100, 0, 10, 50, 36;\ncolumn, -100, 25, -100, 0, 10, 50, 36;\ndetail;\nline, 50, 0, 50, 50, -45, 50, L1;\nrectangle, 50, -50, 50, 15, 5, 0, R1;\nrectangle, 50, -60, 50, 15, 5, 2, R2;\ntext, 40, -50, 50, 0.34, 1, 0, 0, CONGRATULATIONS;\ntext, 50, -60, 40, 0.34, 1, 0, 90, SNOITALUTARGNOC;\nline, 50, -65, 50, 50, -300, 50, L3;\nsphere, 50, -315, 50, 10, 10, 18, REMINDS SORT OF STRETCHED CONDENSER;\ntext, -6, 0, 0, 1, 1, 270, 0, %d;\nassociated file, spongy;\ntotal mass, 45000;\nendpixel;"
      },
      {
        "name": "Box",
        "author": "Alex",
        "source": "TYPE 14;\ndock, -40, 0, -40, 125, 125;\ngrid, 0, 0, 0, 18, 18, 10, 1, THE FLOOR;\nbox, 0, -75, 0, 125, 5, 125, CEILING;\nbox, 0, -75, 0, 90, 5, 90, CEILING;\ndetail;\nbox, 50, -14, 70, 50, 14, 20, STEP;\nbox, 50, -42, 80, 25, 14, 10, STEP;\nbox, 0, -75, 0, 90, 5, 10, BRIDGE E-W;\nbox, 0, -75, 0, 10, 5, 90, BRIDGE N-S;\ncollision high, 0, -75, 0, 90, 5, 10, ZCE-1;\ncollision high, 0, -75, 0, 10, 5, 90, ZCE-2;\ndetail;\ncolumn, -90, -35, -90, 5, 5, 70, 36, column-1;\ncolumn, 90, -35, -90, 5, 5, 70, 36, column-2;\ncolumn, -90, -35, 90, 5, 5, 70, 36, column-3;\ncolumn, 90, -35, 90, 5, 5, 70, 36, column-4;\ncollision, 50, -14, 70, 50, 14, 20, ZC-1;\ncollision, 50, -42, 80, 25, 14, 10, ZC-2;\ncollision, 0, -70, 107.5, 125, 10, 17.5, ZC-3;\ncollision, 0, -70, -107.5, 125, 10, 17.5, ZC-4;\ncollision, 107.5, -70, 0, 17.5, 10, 90, ZC-5;\ncollision, -107.5, -70, 0, 17.5, 10, 90, ZC-6;\nbox, 0, -75, 5, 100, 1, 1, CIRCLET;\nbox, 0, -75, -5, 100, 1, 1, ANOTHER CIRCLET;\nbox, 5, -75, 0, 1, 1, 100, AGAIN A CIRCLET;\nbox, -5, -75, 0, 1, 1, 100, YET ANOTHER CIRCLET;\ndetail;\nsphere, 0, -50, 0, 1, 1, 36, LIL BALL;\nsphere, 60, -30, -35, 2, 1, 36, ANOTHER LIL BALL;\nsphere, -80, -60, -45, 3, 1, 36, YET ANOTHER LIL BALL;\nasterisk, 0, -25, 0, 1, 36, further decorations;\nasterisk, -50, -50, -50, 2, 36, quite meaningless decoration;\nasterisk, 75, -100, -100, 3, 36, gratuitus use of meaningless decoration;\ntext, -115, -80, 0, 2, 2, 90, 0, BOX;\ntext, -18, -200, 0, 3, 3, 0, 0, %d;\ntotal mass, 50000;\nendpixel;"
      },
      {
        "name": "M-P",
        "author": "Alex",
        "source": "TYPE 15;\ndock, 0, -22, 0, 100, 100;\nbox, 0, 0, 0, 100, 2, 100, B1;\ndetail;\nbox, 0, -4, 0, 90, 2, 90, B2;\nbox, 0, -8, 0, 80, 2, 80, B3;\ndetail;\nbox, 0, -12, 0, 70, 2, 70, B4;\nbox, 0, -16, 0, 60, 2, 60, B5;\nbox, 0, -20, 0, 50, 2, 50, B6;\ncollision, 0, 0, 0, 100, 2, 100, ZC1;\ncollision, 0, -4, 0, 90, 2, 90, ZC2;\ncollision, 0, -8, 0, 80, 2, 80, ZC3;\ncollision, 0, -12, 0, 70, 2, 70, ZC4;\ncollision, 0, -16, 0, 60, 2, 60, ZC5;\ncollision, 0, -20, 0, 50, 2, 50, ZC6;\ndetail;\ntext, -6, 0, -100, 1, 0.5, 0, 0, %d;\ntext, 100, 0, -6, 1, 0.5, 0, 90, P-M;\ntext, -6, 0, 100, 1, 0.5, 0, 180, M-P;\ntext, -100, 0, -6, 1, 0.5, 0, 270, P-M;\nasterisk, 50, -22, 50, 3, 36, ST1;\nasterisk, -50, -22, 50, 3, 36, ST2;\nasterisk, 50, -22, -50, 3, 36, ST3;\nasterisk, -50, -22, -50, 3, 36, ST4;\ntotal mass, 35000;\nendpixel;"
      },
      {
        "name": "Dream",
        "author": "Alex",
        "source": "TYPE 16;\ndock, 250, 0, 0, 300, 50;\nline, -250, 0, 0, 250, 0, 0, HORIZ. AXIS;\nasterisk, 0, 0, 0, 80, 45, AST6;\ndetail;\nline, 0, 0, 0, 0, -160, 0, SUPPORT;\nasterisk, -250, 0, 0, 70, 45, AST1;\nasterisk, -150, 0, 0, 90, 45, AST3;\nasterisk, -50, 0, 0, 85, 45, AST5;\nasterisk, 150, 0, 0, 110, 45, AST9;\nasterisk, 250, 0, 0, 60, 45, AST11;\ndetail;\nasterisk, -200, 0, 0, 90, 45, AST2;\nasterisk, 50, 0, 0, 80, 45, AST7;\nasterisk, 100, 0, 0, 100, 45, AST8;\nasterisk, -100, 0, 0, 70, 45, AST4;\nasterisk, 200, 0, 0, 80, 45, AST10;\nrectangle, 0, -175, 0, 25, 5, 2, SIGNPOST #1;\nrectangle, 0, -165, 0, 15, 5, 0, SIGNPOST #2;\ndetail;\nrectangle, 250, 0, 0, 50, 50, 1, DOCK ZONE;\ntext, 0, -175, 16, 2, 2, 0, 270, MAERD;\ntext, -4, -165, 0, 2, 2, 0, 0, %d;\ntotal mass, 45000;\nendpixel;"
      },
      {
        "name": "AKS",
        "author": "Alex",
        "source": "TYPE 17;\ndock, 0, 0, 0, 225, 225;\nbox, 125, 0, 0, 100, 10, 10, AXIS 1;\nbox, 0, 0, 125, 10, 10, 100, AXIS 2;\nbox, -125, 0, 0, 100, 10, 10, AXIS 3;\nbox, 0, 0, -125, 10, 10, 100, AXIS 4;\nline, 0, 0, 0, 0, 495, 0, LINK;\ndetail;\nrectangle, 0, 0, 0, 50, 50, 1, DOCK ZONE;\ndetail;\nrectangle, 0, 500, 0, 10, 5, 0, SIGNPOST;\ndotted ellipse, -225, 0, 0, 30, 30, 2, 10, DE1;\ndotted ellipse, 225, 0, 0, 50, 20, 2, 10, DE2;\ndotted ellipse, 0, 0, -225, 25, 15, 0, 10, DE3;\ndotted ellipse, 0, 0, 225, 60, 30, 0, 10, DE4;\ndetail;\ndotted ellipse, 0, 0, 0, 1, 1, 1, 10, LINK;\ntext, -4, 0, -225, 1, 2, 0, 0, AKS;\ntext, -3, 500, 0, 1, 1, 0, 0, %d;\nforbidden, 137.5, 0, 137.5, 87.5, 0, 87.5;\nforbidden, 137.0, 0, -137.5, 87.5, 0, 87.5;\nforbidden, -137.5, 0, 137.5, 87.5, 0, 87.5;\nforbidden, -137.5, 0, -137.5, 87.5, 0, 87.5;\nforbidden, -30, 0, 137.5, 20, 0, 87.5;\nforbidden, 30, 0, 137.5, 20, 0, 87.5;\nforbidden, -30, 0, -137.5, 20, 0, 87.5;\nforbidden, 30, 0, -137.5, 20, 0, 87.5;\nforbidden, -137.5, 0, 30, 87.5, 0, 20;\nforbidden, 137.5, 0, 30, 87.5, 0, 20;\nforbidden, -137.5, 0, -30, 87.5, 0, 20;\nforbidden, 137.5, 0, -30, 87.5, 0, 20;\ncollision, 125, 0, 0, 100, 10, 10, ZC-AXIS 1;\ncollision, 0, 0, 125, 10, 10, 100, ZC-AXIS 2;\ncollision, -125, 0, 0, 100, 10, 10, ZC-AXIS 3;\ncollision, 0, 0, -125, 10, 10, 100, ZC-AXIS 4;\ntotal mass, 40000;\nendpixel;"
      },
      {
        "name": "Lil Fractal",
        "author": "Alex",
        "source": "TYPE 18;\ndock, 0, 0, 0, 250, 250;\nrectangle, 0, 0, 0, 250, 250, 1, BASE-1;\nrectangle, 0, 0, 0, 200, 200, 1, BASE-2;\nrectangle, 0, -100, 0, 100, 100, 1, INTERMEDIATE;\ndetail;\nline, 200, 0, 200, 100, -100, 100, L1;\nline, -200, 0, 200, -100, -100, 100, L2;\nline, 200, 0, -200, 100, -100, -100, L3;\nline, -200, 0, -200, -100, -100, -100, L4;\nline, 100, -100, 100, 0, -200, 0, L5;\nline, -100, -100, 100, 0, -200, 0, L6;\nline, 100, -100, -100, 0, -200, 0, L7;\nline, -100, -100, -100, 0, -200, 0, L8;\ndetail;\nline, 100, -100, 100, 0, 0, 200, L9;\nline, -100, -100, 100, 0, 0, 200, L10;\nline, 100, -100, -100, 0, 0, -200, L11;\nline, -100, -100, -100, 0, 0, -200, L12;\nline, -200, 0, 0, -100, -100, -100, L13;\nline, -200, 0, 0, -100, -100, 100, L14;\nline, 200, 0, 0, 100, -100, -100, L15;\nline, 200, 0, 0, 100, -100, 100, L16;\ndetail;\ndotted ellipse, 0, -225, 0, 25, 25, 0, 10, DE1;\ndotted ellipse, 0, -225, 0, 25, 25, 1, 10, DE2;\ndotted ellipse, 0, -225, 0, 25, 25, 2, 10, DE3;\ntext, -10, -225, 0, 2, 2, 0, 0, %d;\ntext, -230, 0, -230, 2, 3, 270, 0, L_I_L_F_R_A_C_T_A_L;\ntotal mass, 40000;\nendpixel;"
      },
      {
        "name": "Cage",
        "author": "Alex",
        "source": "TYPE 19;\ndock, 0, 0, 0, 200, 200;\nbox, 0, 0, 0, 200, 200, 200;\nwave, 0, -200, 0, 1.11111, 200, 1, 18, wave 1;\nwave, 0, -200, 0, 1.11111, -200, 1, 18, wave 1;\nwave, 0, 200, 0, 1.11111, 200, 1, 18, wave 1;\nwave, 0, 200, 0, 1.11111, -200, 1, 18, wave 1;\ndetail;\nwave, 0, 0, -200, 1.11111, 200, 0, 18, wave 3;\nwave, 0, 0, -200, 1.11111, -200, 0, 18, wave 3;\nwave, 0, 0, 200, 1.11111, 200, 0, 18, wave 3;\nwave, 0, 0, 200, 1.11111, -200, 0, 18, wave 3;\ndetail;\nwave, -200, 0, 0, 1.11111, 200, 2, 18, wave 2;\nwave, -200, 0, 0, 1.11111, -200, 2, 18, wave 2;\nwave, 200, 0, 0, 1.11111, 200, 2, 18, wave 2;\nwave, 200, 0, 0, 1.11111, -200, 2, 18, wave 2;\ndetail;\ngrid, 0, 0, 0, 200, 200, 2, 1, FLOOR;\ntext, -180, 0, 180, 1, 2, 270, 0, \"CAGE\";\ntext, -180, 0, 170, 1, 2, 270, 0, PIXEL_NUMBER_%d;\ntotal mass, 60000;\nendpixel;"
      },
      {
        "name": "Microbe",
        "author": "Alex",
        "source": "TYPE 20;\ndock, 0, -1, 0, 6, 3;\nbox, 0, 0, 0, 6, 1, 3, MIDDLE BOX;\ndetail;\ndetail;\nbox, 50, 0, 50, 1, 1, 1, SIDE BOX 1;\nbox, 50, 0, -50, 1, 1, 1, SIDE BOX 2;\nbox, -50, 0, 50, 1, 1, 1, SIDE BOX 3;\nbox, -50, 0, -50, 1, 1, 1, SIDE BOX 4;\ndetail;\nline, 6, 0, 3, 49, 0, 49, BRIDGE 1;\nline, -6, 0, 3, -49, 0, 49, BRIDGE 2;\nline, 6, 0, -3, 49, 0, -49, BRIDGE 3;\nline, -6, 0, -3, -49, 0, -49, BRIDGE 4;\ntext, -4.5, 0, 0, 0.25, 0.25, 270, 0, microbe-%d;\ntotal mass, 15000;\nendpixel;"
      },
      {
        "name": "Satellite",
        "author": "Alex",
        "source": "TYPE 21;\ndock, 0, 0, 0, 300, 300;\ngrid, 175, 0, 0, 50, 20, 5, 1, grid 1;\ngrid, -175, 0, 0, 50, 20, 5, 1, grid 2;\ndetail;\ngrid, 0, 0, 175, 20, 50, 5, 1, grid 3;\ngrid, 0, 0, -175, 20, 50, 5, 1, grid 4;\ndetail;\nbox, 0, 50, 0, 49, 49, 49, \"CENTRAL UNIT\";\ncolumn, 0, 250, 0, 2, 5, 300, 36, ANTENNA;\ndetail;\ncolumn, 0, 125, 0, 71, 15, 50, 9, PARABOLA;\ncolumn, 0, 175, 0, 100, 72, 50, 9, PARABOLA;\nsphere, 0, 410, 0, 10, 1, 24, FOCUS;\nforbidden, 175, 0, 175, 125, 0, 125;\nforbidden, -175, 0, 175, 125, 0, 125;\nforbidden, 175, 0, -175, 125, 0, 125;\nforbidden, -175, 0, -175, 125, 0, 125;\nbox, 45, -2, 45, 1, 2, 1, MICROROCKET-1;\nbox, -45, -2, 45, 1, 2, 1, MICROROCKET-2;\nbox, 45, -2, -45, 1, 2, 1, MICROROCKET-3;\nbox, -45, -2, -45, 1, 2, 1, MICROROCKET-4;\nbox, 0, -4, -30, 11, 4, 10, SIGNPOST (IN A BOX);\ncollision, 0, -4, -30, 11, 4, 10;\ntext, -10, -4, -30, 0.45, 0.45, 270, 0, SATELLITE-%d;\ntotal mass, 50000;\nendpixel;"
      },
      {
        "name": "Great Lump",
        "author": "Alex",
        "source": "TYPE 22;\ndock, -400, 0, -400, 500, 500;\nrectangle, 0, 0, 0, 500, 500, 1;\ngridsphere, 0, -300, 0, 300, 1, 18;\nforbidden, 0, 0, 0, 200, 0, 200;\ndetail;\ncolumn, 0, 150, 0, 0, 30, 300, 45;\ncolumn, 0, -750, 0, 30, 0, 300, 45;\ndetail;\ndetail;\ntext, -30, -300, 0, 10, 10, 0, 0, %d;\ntext, -450, 0, -440, 2, 2, 270, 0, GREAT;\ntext, -450, 0, -450, 2, 2, 270, 0, LUMP;\ntotal mass, 100000;\nendpixel;"
      },
      {
        "name": "Tomb #1",
        "author": "Alex",
        "source": "TYPE 23;\ndock, -70, 0, -70, 200, -1;\ndotted ellipse, 0, 0, 0, 200, 200, 1, 1;\ncolumn, 0, 0, 0, 1, 200, 0, 18;\ndetail;\nbox, 2, -35, 190, 20, 35, 1;\nbox, 0, -10, 100, 20, 10, 30;\nbox, 0, -9.5, 100, 19.5, 9.5, 29.5;\nbox, 0, -9, 100, 19, 9, 29;\nbox, 0, -8.5, 100, 18.5, 8.5, 28.5;\nbox, 0, -8, 100, 18, 8, 28;\ndetail;\nspiral, 0, -20, 100, 0.5, 1, 30;\nspiral, 0, 0, 100, 0.5, 1, 30;\nbox, 0, -30, 100, 1, 10, 1;\nbox, 0, -34, 100, 5, 1, 1;\ndetail;\ntext, -15, -66, 189, 0.25, 0.25, 0, 0, THIS_COLD_CRYSTAL_TOMB;\ntext, -15, -64, 189, 0.25, 0.25, 0, 0, WAS_ERECT_IN_MEMORY_OF_THE;\ntext, -15, -62, 189, 0.25, 0.25, 0, 0, EXTREMELY_SAD_END_OF_AN_UNKNOWN,;\ntext, -15, -60, 189, 0.25, 0.25, 0, 0, INNOCENT,_YOUNG_WHITE_KITTEN,;\ntext, -15, -58, 189, 0.25, 0.25, 0, 0, DECEASED_IN_FRONT_OF_THE_EYES;\ntext, -15, -56, 189, 0.25, 0.25, 0, 0, OF_AN_EQUALLY_MISFORTUNED_FEMALE;\ntext, -15, -54, 189, 0.25, 0.25, 0, 0, CONSPECIFIC,_AFTER_HAVING_LIVED;\ntext, -15, -52, 189, 0.25, 0.25, 0, 0, FOR_A_SINGLE_SUMMER.;\ntext, -13, -40, 189, 0.25, 0.25, 0, 0, ALL_THESE_CRYSTAL_PIXELS;\ntext, -13, -38, 189, 0.25, 0.25, 0, 0, WOULD_LIKE_TO_ESPRESS;\ntext, -13, -36, 189, 0.25, 0.25, 0, 0, THEIR_COLD_SORROW.;\nforbidden, 0, -10, 100, 20, 10, 30;\ntotal mass, 60000;\nendpixel;"
      },
      {
        "name": "Tomb #2",
        "author": "Alex",
        "source": "TYPE 24;\ndock, -70, 0, -70, 200, -1;\ndotted ellipse, 0, 0, 0, 200, 200, 1, 1;\ncolumn, 0, 0, 0, 1, 200, 0, 18;\ndetail;\nbox, 2, -35, 190, 20, 35, 1;\nbox, 0, -10, 100, 20, 10, 30;\nbox, 0, -9.5, 100, 19.5, 9.5, 29.5;\nbox, 0, -9, 100, 19, 9, 29;\nbox, 0, -8.5, 100, 18.5, 8.5, 28.5;\nbox, 0, -8, 100, 18, 8, 28;\ndetail;\nspiral, 0, -20, 100, 0.5, 1, 30;\nspiral, 0, 0, 100, 0.5, 1, 30;\nbox, 0, -30, 100, 1, 10, 1;\nbox, 0, -34, 100, 5, 1, 1;\ndetail;\ntext, -15, -60, 189, 0.25, 0.25, 0, 0, TO_THE_FEMALE_COMPANION_OF_THE;\ntext, -15, -58, 189, 0.25, 0.25, 0, 0, WHITE_KITTEN,_DECEASED_TO_GO_WHERE;\ntext, -15, -54, 189, 0.25, 0.25, 0, 0, NOBODY_KNOWS._I'M_SORRY,_LITTLE_LOST;\ntext, -15, -52, 189, 0.25, 0.25, 0, 0, DREAM,_I_ALREADY_CRIED_ALL_THE_TEARS;\ntext, -15, -50, 189, 0.25, 0.25, 0, 0, I_HAD,_EXCEPT_FOR_THIS_ONE,_THE_MOST;\ntext, -15, -48, 189, 0.25, 0.25, 0, 0, BEAUTIFUL_ONE,_KEPT_SPECIALLY_FOR_YOU.;\ntext, -15, -42, 189, 0.25, 0.25, 0, 0, BEST_WISHES,_WHATEVER_YOU_ARE_NOW,;\ntext, -15, -40, 189, 0.25, 0.25, 0, 0, AND_THANKS_FOR_HAVING_BEEN_WITH_ME;\ntext, -15, -38, 189, 0.25, 0.25, 0, 0, WHEN_I_WAS_DESPERATE.;\nforbidden, 0, -10, 100, 20, 10, 30;\ntotal mass, 60000;\nendpixel;"
      },
      {
        "name": "Storage",
        "author": "Alex",
        "source": "TYPE 25;\ndock, 0, 40, 0, 40, 40;\ngrid, 0, -40, 0, 5, 5, 10, 1;\ngrid, 0, +40, 0, 5, 5, 10, 1;\ngrid, 0, 0, 25, 2.5, 4, 20, 0;\ndetail;\ngrid, 0, 0, -25, 2.5, 4, 20, 0;\ngrid, 25, 0, 0, 2.5, 4, 20, 2;\ngrid, -25, 0, 0, 2.5, 4, 20, 2;\ndetail;\nrectangle, 0, 40, 0, 40, 40, 1;\nline, 40, 40, 40, 50, 40, 50;\nline, -40, 40, 40, -50, 40, 50;\nline, 40, 40, -40, 50, 40, -50;\nline, -40, 40, -40, -50, 40, -50;\ndetail;\ntext, -0.59, -13.5, 3.1, 0.04, 0.1, 0, 0, STORAGE_FOR;\ntext, -0.99, -13, 3.1, 0.04, 0.1, 0, 0, OBJECTS_IN_EXCESS;\ntext, -0.59, -13.5, 3, 0.04, 0.1, 0, 0, STORAGE_FOR;\ntext, -0.99, -13, 3, 0.04, 0.1, 0, 0, OBJECTS_IN_EXCESS;\nbox, 0, 13.75, 3.05, 0.1, 26.275, 0.05;\nbox, 0, -13.25, 3.05, 1.4, 0.7, 0.05;\ntotal mass, 15000;\nendpixel;"
      },
      {
        "name": "Garage",
        "author": "Alex",
        "source": "TYPE 26;\ndock, 0, 50, 0, 250, -1;\ncolumn, 0, 55, 0, 300, 5, 10, 9;\ndetail;\ndonut, 0, 0, 0, 200, 50, 1, 12;\ndetail;\ncolumn, 0, 95, 0, 0, 5, 90, 36;\ndetail;\ntext, -12, -100, 0, 3, 3, 90, 0, %d;\ntext, -12, -101, 0, 3, 3, 90, 0, %d;\ntext, -12, -102, 0, 3, 3, 90, 0, %d;\ntext, -20, 135, 0, 2, 2, 0, 0, GARAGE;\ntext, 0, 135, 20, 2, 2, 0, 270, EGARAG;\ntotal mass, 40000;\nendpixel;"
      },
      {
        "name": "White Dwarf",
        "author": "Alex",
        "source": "TYPE 27;\ndock, 0, 0, 0, 30, 30;\nellipse, 0, 0, 0, 30, 500, 0, 4;\nellipse, 0, 0, 0, 500, 30, 1, 4;\nellipse, 0, 0, 0, 30, 500, 2, 4;\ndetail;\nellipse, 0, 0, 0, 500, 30, 0, 4;\nellipse, 0, 0, 0, 30, 500, 1, 4;\nellipse, 0, 0, 0, 500, 30, 2, 4;\ndetail;\nsphere, 0, 0, 0, 100, 0.5, 8;\ndetail;\ntext, -0.59, -53.5, 3.1, 0.1, 0.1, 0, 0, WHITE;\ntext, -0.99, -53, 3.1, 0.1, 0.1, 0, 0, DWARF;\ntext, -0.59, -53.5, 3, 0.1, 0.1, 0, 0, WHITE;\ntext, -0.99, -53, 3, 0.1, 0.1, 0, 0, DWARF;\nbox, 0, -26.275, 3.05, 0.1, 26.275, 0.05;\nbox, 0, -53.25, 3.05, 1.4, 0.7, 0.05;\ntotal mass, 80000;\nendpixel;"
      },
      {
        "name": "Stalactite",
        "author": "Alex",
        "source": "TYPE 28;\ndock, 0, 100, 0, 150, 150;\nbox, 0, -151, 0, 150, 1, 150;\nbox, 0, 151, 0, 150, 1, 150;\nbox, 150, 0, 150, 1, 150, 1;\nbox, -150, 0, 150, 1, 150, 1;\nbox, 150, 0, -150, 1, 150, 1;\nbox, -150, 0, -150, 1, 150, 1;\ndetail;\ncolumn, 0, -50, 0, 0, 10, 200, 45;\ncolumn, 0, 75, 0, 10, 0, 50, 45;\ndetail;\ncolumn, 0, -100, 125, 0, 5, 100, 45;\ncolumn, 0, -100, -125, 0, 5, 100, 45;\ncolumn, 125, -100, 0, 0, 5, 100, 45;\ncolumn, -125, -100, 0, 0, 5, 100, 45;\ncolumn, 100, -125, 100, 0, 3, 50, 45;\ncolumn, -100, -125, 100, 0, 3, 50, 45;\ncolumn, 100, -125, -100, 0, 3, 50, 45;\ncolumn, -100, -125, -100, 0, 3, 50, 45;\ncolumn, 50, -137.5, 50, 0, 3, 25, 45;\ncolumn, -50, -137.5, 50, 0, 3, 25, 45;\ncolumn, 50, -137.5, -50, 0, 3, 25, 45;\ncolumn, -50, -137.5, -50, 0, 3, 25, 45;\ndetail;\nbox, 0, 108.333, 0, 50, 8.333, 50;\ngrid, 0, 100, 0, 20, 20, 5, 1;\ncollision, 0, 108.333, 0, 50, 8.333, 50;\nbox, 0, 125, 0, 100, 8.333, 100;\ngrid, 0, 116.666, 0, 40, 40, 5, 1;\ncollision, 0, 125, 0, 100, 8.333, 100;\nbox, 0, 141.666, 0, 150, 8.333, 150;\ngrid, 0, 133.333, 0, 60, 60, 5, 1;\ncollision, 0, 141.666, 0, 150, 8.333, 150;\nassociated file, tissue;\ntotal mass, 60000;\nendpixel;"
      },
      {
        "name": "Star Ring",
        "author": "Alex",
        "source": "TYPE 29;\ndock, 90, 0, 90, 190, -1;\nellipse, 0, 0, 0, 205, 205, 1, 45;\nellipse, 0, 0, 0, 200, 200, 1, 45;\nellipse, 0, 0, 0, 195, 195, 1, 45;\ndetail;\nbox, 40, -40, 0, 5, 40, 40;\nbox, -40, -40, 0, 5, 40, 40;\nbox, 0, -40, 35, 45, 40, 5;\nbox, 0, -85, 0, 45, 5, 40;\nbox, -25, -40, -35, 20, 40, 5;\nbox, 25, -40, -35, 20, 40, 5;\nbox, 0, -15, -35, 5, 15, 5;\nbox, 0, -7.5, -45, 5, 7.5, 5;\nbox, 10, -25, -45, 5, 25, 5;\ndetail;\nasterisk, 0, 0, 200, 25, 20, LIL STAR 1;\nasterisk, 0, 0, -200, 25, 20, LIL STAR 2;\nasterisk, 200, 0, 0, 25, 20, LIL STAR 3;\nasterisk, -200, 0, 0, 25, 20, LIL STAR 4;\nasterisk, 141, 0, 141, 25, 20, LIL STAR 5;\nasterisk, -141, 0, -141, 25, 20, LIL STAR 6;\nasterisk, 141, 0, -141, 25, 20, LIL STAR 7;\nasterisk, -141, 0, 141, 25, 20, LIL STAR 8;\ndetail;\ngrid, 0, -90, 0, 9, 8, 10, 1;\ngrid, 0, -45, 40, 9, 9, 10, 0;\ngrid, 45, -40, 0, 8, 8, 10, 2;\ngrid, -45, -40, 0, 8, 8, 10, 2;\ncollision, 40, -40, 0, 5, 40, 40;\ncollision, -40, -40, 0, 5, 40, 40;\ncollision, 0, -40, 35, 45, 40, 5;\ncollision high, 0, -85, 0, 45, 5, 40;\ncollision, -25, -40, -35, 20, 40, 5;\ncollision, 25, -40, -35, 20, 40, 5;\ncollision, 0, -15, -35, 5, 15, 5;\ncollision, 0, -7.5, -45, 5, 7.5, 5;\ncollision, 10, -25, -45, 5, 25, 5;\ntotal mass, 50000;\nendpixel;"
      },
      {
        "name": "Claustrophobia",
        "author": "Alex",
        "source": "TYPE 30;\ndock, 0, 60, 0, 145, 145;\nbox, 0, 0, 0, 200, 200, 200;\nline, -300, 0, -300, 0, -300, 0;\nline, 300, 0, -300, 0, -300, 0;\nline, -300, 0, 300, 0, -300, 0;\nline, 300, 0, 300, 0, -300, 0;\nrectangle, 0, 0, 0, 300, 300, 1;\nline, -300, 0, -300, 0, 300, 0;\nline, 300, 0, -300, 0, 300, 0;\nline, -300, 0, 300, 0, 300, 0;\nline, 300, 0, 300, 0, 300, 0;\ndetail;\ngrid, 0, 60, 0, 8, 8, 40, 1;\ngrid, 0, -60, 0, 16, 16, 20, 1;\nasterisk, 0, -300, 0, 60, 45;\nasterisk, 0, 300, 0, 60, 45;\ndetail;\ngrid, 0, -35, 160, 32, 5, 10, 0;\ngrid, 0, 35, 160, 32, 5, 10, 0;\ngrid, 0, 0, -160, 32, 12, 10, 0;\ngrid, 160, 0, 0, 32, 12, 10, 2;\ngrid, -160, 0, 0, 32, 12, 10, 2;\ndetail;\ntext, -75, 0, 159.75, 3, 4, 0, 0, CLAUSTROPHOBIA;\ntext, -75, 0, 160.25, 3, 4, 0, 0, CLAUSTROPHOBIA;\nassociated file, spongy;\ntotal mass, 90000;\nendpixel;"
      },
      {
        "name": "Bicycle Wheel",
        "author": "Alex",
        "source": "TYPE 31;\ndock, 0, 100, -750, 1450, -1;\ncolumn, 0, 100, 0, 25, 1450, 10, 3;\ncolumn, 0, 0, 0, 25, 25, 2600, 60;\ncollision, 0, 0, 0, 25, 2600, 25;\ndetail;\ncolumn, 0, -100, 0, 1450, 25, 10, 3;\ndonut, 0, 0, 0, 1300, 200, 1, 4;\ndetail;\ndetail;\nsolidbox, 0,  80, -300, 50, 20, 50;\nsolidbox, 0,  60, -350, 50, 10, 50;\nsolidbox, 0,  40, -400, 50, 10, 50;\nsolidbox, 0,  20, -450, 50, 10, 50;\nsolidbox, 0,   0, -500, 50, 10, 50;\nsolidbox, 0, -20, -550, 50, 10, 50;\nsolidbox, 0, -40, -600, 50, 10, 50;\nsolidbox, 0, -60, -650, 50, 10, 50;\nsolidbox, 0, -80, -700, 50, 10, 50;\nsolidbox, 250, -90, -700, 200, 10, 50;\nsolidbox, 420, -120, -620, 30, 30, 30;\nsolidbox, 420, -180, -560, 30, 30, 30;\nsolidbox, 420, -240, -500, 30, 30, 30;\nsolidbox, 420, -300, -440, 30, 30, 30;\nsolidbox, 420, -360, -380, 30, 30, 30;\nsolidbox, 420, -420, -320, 30, 30, 30;\nsolidbox, 420, -480, -260, 30, 30, 30;\nsolidbox, 420, -540, -200, 30, 30, 30;\nsolidbox, 420, -600, -140, 30, 30, 30;\nsolidbox, 420, -660, -80, 30, 30, 30;\nsolidbox, 360, -720, -80, 30, 30, 30;\nsolidbox, 300, -780, -80, 30, 30, 30;\nsolidbox, 240, -840, -80, 30, 30, 30;\nsolidbox, 180, -900, -80, 30, 30, 30;\nsolidbox, 120, -960, -80, 30, 30, 30;\nsolidbox, 60, -1020, -80, 30, 30, 30;\nsolidbox, 0, -1080, -80, 30, 30, 30;\nsolidbox, -60, -1140, -80, 30, 30, 30;\nsolidbox, -120, -1200, -80, 30, 30, 30;\nsolidbox, -120, -1240, 30, 30, 10, 80;\nsolidbox, 0, -1255, 30, 90, 5, 80;\ntotal mass, 250000;\nendpixel;"
      }
    ],
    "models": [
      {
        "name": "Hypercube",
        "author": "Alex",
        "source": "MODEL 0;\ndock, 5, 5, 5, 0, 5;\nbox, 0, 0, 0, 5, 5, 5;\nbox, 0, 0, 0, 4, 4, 4;\nbox, 0, 0, 0, 3, 3, 3;\nbox, 0, 0, 0, 2, 2, 2;\nbox, 0, 0, 0, 1, 1, 1;\ntotal mass, 10;\nendpixel;"
      },
      {
        "name": "Diamond",
        "author": "Alex",
        "source": "MODEL 1;\ndock, 1, 1, 1, 0, 1;\nline, -1, 0, -1, 0, -1, 0;\nline, 1, 0, -1, 0, -1, 0;\nline, -1, 0, 1, 0, -1, 0;\nline, 1, 0, 1, 0, -1, 0;\nrectangle, 0, 0, 0, 1, 1, 1;\nline, -1, 0, -1, 0, 1, 0;\nline, 1, 0, -1, 0, 1, 0;\nline, -1, 0, 1, 0, 1, 0;\nline, 1, 0, 1, 0, 1, 0;\ntotal mass, 10;\nendpixel;"
      },
      {
        "name": "Donut",
        "author": "Alex",
        "source": "MODEL 2;\ndock, 10, 5, 10, 0, 5;\ndonut, 0, 0, 0, 7, 3, 1, 20;\ntotal mass, 50;\nendpixel;"
      },
      {
        "name": "Bedside Lamp",
        "author": "Alex",
        "source": "MODEL 3;\ndock, 6, 23.5, 6, 9, 4.5;\ngridsphere, 0, 0, 0, 4, 1, 24;\ncolumn, 0, 3.75, 0, 3, 3, 0.75, 24;\ncolumn, 0, -5, 0, 1, 1, 3, 24;\ncolumn, 0, -9, 0, 6, 6, 10, 24;\nsphere, 0, -9, 0, 2, 1, 18;\ndetail;\ndetail;\ndetail;\nasterisk, 0, -9, 0, 25, 36;\ntotal mass, 50;\nendpixel;"
      },
      {
        "name": "Table",
        "author": "Alex",
        "source": "MODEL 4;\ndock, 25, 11, 25, 0, 11;\nbox, 24, 1, 24, 1, 10, 1;\nbox, -24, 1, 24, 1, 10, 1;\nbox, 24, 1, -24, 1, 10, 1;\nbox, -24, 1, -24, 1, 10, 1;\nbox, 0, -10, 0, 25, 1, 25;\ncollision, 0, 0, 0, 25, 11, 25;\ntotal mass, 150;\nendpixel;"
      },
      {
        "name": "Home Sweet Pixel",
        "author": "Alex",
        "source": "MODEL 5;\ndock, 20, 20, 1, 0, 20;\nbox, 0, 0, 0, 20, 20, 1;\nbox, 0, 0, 0, 19, 19, 1;\ntext, -11, -12, 0, 1.8, 2.6, 0, 0, HOME;\ntext, -14, 0, 0, 1.8, 2.6, 0, 0, SWEET;\ntext, -14, 12, 0, 1.8, 2.6, 0, 0, PIXEL;\ntext, -11.15, -12.15, 0, 1.8, 2.6, 0, 0, HOME;\ntext, -14.15, 0.15, 0, 1.8, 2.6, 0, 0, SWEET;\ntext, -14.15, 12.15, 0, 1.8, 2.6, 0, 0, PIXEL;\ntotal mass, 100;\nendpixel;"
      },
      {
        "name": "Coat Hanger?",
        "author": "Alex",
        "source": "MODEL 6;\ndock, 20, 34, 1, 0, 34;\nbox, 0, 0, 0, 1, 30, 1;\nbox, 0, 32, 0, 20, 2, 2;\nbox, 0, 32, 0, 2, 2, 20;\nbox, 0, -32, 0, 20, 2, 2;\ntotal mass, 100;\nendpixel;"
      },
      {
        "name": "Narrow Table?",
        "author": "Alex",
        "source": "MODEL 7;\ndock, 40, 20, 5, 0, 20;\nbox, 39, -0.5, 4, 1, 17.5, 1;\nbox, -39, -0.5, 4, 1, 17.5, 1;\nbox, 39, -0.5, -4, 1, 17.5, 1;\nbox, -39, -0.5, -4, 1, 17.5, 1;\nbox, 0, -19, 0, 40, 1, 5;\nbox, -39, 18, 0, 1, 1, 10;\nbox, 39, 18, 0, 1, 1, 10;\ntotal mass, 200;\nendpixel;"
      },
      {
        "name": "1000 Lire",
        "author": "Alex",
        "source": "MODEL 8;\ndock, 4, 0.01, 2, 0, 0.01;\nrectangle, 0, 0, 0, 4, 2, 1;\nrectangle, 0, 0, 0, 3.8, 1.8, 1;\nrectangle, 1.5, 0, 0, 2.1, 1.5, 1;\nellipse, -0.2, 0, -1.1, 0.5, 0.5, 1, 36;\nellipse, 2.5, 0, 0, 1.2, 1.5, 1, 18;\ntext, -3.4, 0, 1.3, 0.1, 0.2, 270, 0, 1000;\ntext, -3.35, 0, 1.35, 0.1, 0.2, 270, 0, 1000;\ntext, -0.4, 0, 1.4, 0.05, 0.1, 270, 0, LIRE;\ntext, 0.5, 0, 1.3, 0.075, 0.15, 270, 0, MILLE;\ntext, -0.4, 0, -1.2, 0.05, 0.075, 270, 0, BANCA_D'ITALIA;\ntotal mass, 10;\nendpixel;"
      },
      {
        "name": "Floor Lamp (tall)",
        "author": "Alex",
        "source": "MODEL 9;\ndock, 1, 16, 1, -3, 16;\nline, 0, 16, 0, 0, -16, 0;\nline, 0, 16, -3, 0, 16, 3;\nline, -3, 16, 0, 3, 16, 0;\nasterisk, 0, -16, 0, 3, 18;\ntotal mass, 100;\nendpixel;"
      },
      {
        "name": "Floor Lamp (short)",
        "author": "Alex",
        "source": "MODEL 10;\ndock, 0, 0, 0, 0, 30;\nline, 0, 30, 0, 0, -30, 0;\nline, 0, 30, -6, 0, 30, 6;\nline, -6, 30, 0, 6, 30, 0;\nasterisk, 0, -30, 0, 12, 18;\ntotal mass, 100;\nendpixel;"
      },
      {
        "name": "Blackboard (horizontal) #1",
        "author": "Alex",
        "source": "MODEL 11;\ndock, 0, 0, 0, 0, 0;\nrectangle, 0, 0, 0, 7.5, 6, 1;\nrectangle, 0, 0, 0, 8, 6.5, 1;\nrectangle, 7, 0, 6.25, 1, 0.25, 1;\nrectangle, -7, 0, 6.25, 1, 0.25, 1;\nrectangle, 7, 0, -6.25, 1, 0.25, 1;\nrectangle, -7, 0, -6.25, 1, 0.25, 1;\nrectangle, 7.75, 0, 5.5, 0.25, 1, 1;\nrectangle, -7.75, 0, 5.5, 0.25, 1, 1;\nrectangle, 7.75, 0, -5.5, 0.25, 1, 1;\nrectangle, -7.75, 0, -5.5, 0.25, 1, 1;\nassociated file, text-h;\ntotal mass, 50;\nendpixel;"
      },
      {
        "name": "Blackboard (vertical) #1",
        "author": "Alex",
        "source": "MODEL 12;\ndock, 0, 0, 0, 0, 6.5;\nrectangle, 0, 0, 0, 7.5, 6, 0;\nrectangle, 0, 0, 0, 8, 6.5, 0;\nrectangle, 7, -6.25, 0, 1, 0.25, 0;\nrectangle, -7, -6.25, 0, 1, 0.25, 0;\nrectangle, 7, 6.25, 0, 1, 0.25, 0;\nrectangle, -7, 6.25, 0, 1, 0.25, 0;\nrectangle, 7.75, -5.5, 0, 0.25, 1, 0;\nrectangle, -7.75, -5.5, 0, 0.25, 1, 0;\nrectangle, 7.75, 5.5, 0, 0.25, 1, 0;\nrectangle, -7.75, 5.5, 0, 0.25, 1, 0;\nline, -8, -6, 0, -8, 6, 2;\nline, -8, 6, 2, -8, 6, 0;\nline, 8, -6, 0, 8, 6, 2;\nline, 8, 6, 2, 8, 6, 0;\nassociated file, text-v;\ntotal mass, 50;\nendpixel;"
      },
      {
        "name": "Floor Mat? (small)",
        "author": "Alex",
        "source": "MODEL 13;\ndock, 12.5, 1, 12.5, 0, 1;\nbox, 0, 0, 0, 12.5, 1, 12.5;\ngrid, 0, 0, 0, 5, 5, 5, 1;\ntotal mass, 100;\nendpixel;"
      },
      {
        "name": "Floor Mat? (medium)",
        "author": "Alex",
        "source": "MODEL 14;\ndock, 25, 1, 25, 0, 1;\nbox, 0, 0, 0, 25, 1, 25;\ngrid, 0, 0, 0, 5, 5, 10, 1;\ntotal mass, 100;\nendpixel;"
      },
      {
        "name": "Floor Mat? (large)",
        "author": "Alex",
        "source": "MODEL 15;\ndock, 50, 1, 50, 0, 1;\nbox, 0, 0, 0, 50, 1, 50;\ngrid, 0, 0, 0, 5, 5, 20, 1;\ntotal mass, 100;\nendpixel;"
      },
      {
        "name": "Blackboard (vertical) #2",
        "author": "Alex",
        "source": "MODEL 16;\ndock, 0, 0, 0, 0, 6.5;\nrectangle, 0, 0, 0, 7.5, 6, 0;\nrectangle, 0, 0, 0, 8, 6.5, 0;\nrectangle, 7, -6.25, 0, 1, 0.25, 0;\nrectangle, -7, -6.25, 0, 1, 0.25, 0;\nrectangle, 7, 6.25, 0, 1, 0.25, 0;\nrectangle, -7, 6.25, 0, 1, 0.25, 0;\nrectangle, 7.75, -5.5, 0, 0.25, 1, 0;\nrectangle, -7.75, -5.5, 0, 0.25, 1, 0;\nrectangle, 7.75, 5.5, 0, 0.25, 1, 0;\nrectangle, -7.75, 5.5, 0, 0.25, 1, 0;\nline, -8, -6, 0, -8, 6, 2;\nline, -8, 6, 2, -8, 6, 0;\nline, 8, -6, 0, 8, 6, 2;\nline, 8, 6, 2, 8, 6, 0;\nassociated file, text-v;\ntotal mass, 50;\nendpixel;"
      },
      {
        "name": "Railing? #1",
        "author": "Alex",
        "source": "MODEL 17;\ndock, 50, 20, 2, 0, 20;\nbox, 0, -18, 0, 50, 2, 2;\nbox, -45, 2, 0, 1, 18.5, 1;\nbox, -35, 2, 0, 1, 18.5, 1;\nbox, -25, 2, 0, 1, 18.5, 1;\nbox, -15, 2, 0, 1, 18.5, 1;\nbox, -5, 2, 0, 1, 18.5, 1;\nbox, 5, 2, 0, 1, 18.5, 1;\nbox, 15, 2, 0, 1, 18.5, 1;\nbox, 25, 2, 0, 1, 18.5, 1;\nbox, 35, 2, 0, 1, 18.5, 1;\nbox, 45, 2, 0, 1, 18.5, 1;\ntotal mass, 150;\nendpixel;"
      },
      {
        "name": "Railing? #2",
        "author": "Alex",
        "source": "MODEL 18;\ndock, 2, 20, 40, 0, 20;\nbox, 0, -18, 0, 2, 2, 40;\nbox, 0, 2, -35, 1, 18.5, 1;\nbox, 0, 2, -25, 1, 18.5, 1;\nbox, 0, 2, -15, 1, 18.5, 1;\nbox, 0, 2, -5, 1, 18.5, 1;\nbox, 0, 2, 5, 1, 18.5, 1;\nbox, 0, 2, 15, 1, 18.5, 1;\nbox, 0, 2, 25, 1, 18.5, 1;\nbox, 0, 2, 35, 1, 18.5, 1;\ntotal mass, 150;\nendpixel;"
      },
      {
        "name": "Orbital Engine Cover",
        "author": "Alex",
        "source": "MODEL 19;\ndock, 25, 12.5, 25, -5, 12.5;\nellipse, 0, -12.5, 0, 25, 25, 1, 18;\nellipse, 0, -6.25, 0, 25, 25, 1, 18;\nellipse, 0, 0, 0, 25, 25, 1, 18;\nellipse, 0, 6.25, 0, 25, 25, 1, 18;\nellipse, 0, 12.5, 0, 25, 25, 1, 18;\nline, 0, -12.5, 25, 0, 12.5, 25;\nline, 25, -12.5, 0, 25, 12.5, 0;\nline, 0, -12.5, -25, 0, 12.5, -25;\nline, -25, -12.5, 0, -25, 12.5, 0;\nline, 17.68, -12.5, 17.68, 17.68, 12.5, 17.68;\nline, -17.68, -12.5, 17.68, -17.68, 12.5, 17.68;\nline, 17.68, -12.5, -17.68, 17.68, 12.5, -17.68;\nline, -17.68, -12.5, -17.68, -17.68, 12.5, -17.68;\ncolumn, 0, -15, 0, 25, 15, 5, 18;\nrectangle, 0, -17.5, 0, 10, 4, 1;\nrectangle, 0, -17.5, 0, 10.2, 4.2, 1;\nrectangle, 0, -17.5, 0, 10.44, 4.44, 1;\ntext, -5, -17.5, 2, 0.3, 0.6, 270, 0, WARNING:;\ntext, -5, -17.5, 2, 0.3, 0.6, 270, 0, WARNING:;\ntext, -8, -17.5, -2, 0.25, 0.4, 270, 0, <ORBITAL_ENGINE>;\ntotal mass, 100;\nendpixel;"
      },
      {
        "name": "Blackboard (vertical) #3",
        "author": "Alex",
        "source": "MODEL 20;\ndock, 0, 0, 0, 0, 6.5;\nrectangle, 0, 0, 0, 7.5, 6, 0;\nrectangle, 0, 0, 0, 8, 6.5, 0;\nrectangle, 7, -6.25, 0, 1, 0.25, 0;\nrectangle, -7, -6.25, 0, 1, 0.25, 0;\nrectangle, 7, 6.25, 0, 1, 0.25, 0;\nrectangle, -7, 6.25, 0, 1, 0.25, 0;\nrectangle, 7.75, -5.5, 0, 0.25, 1, 0;\nrectangle, -7.75, -5.5, 0, 0.25, 1, 0;\nrectangle, 7.75, 5.5, 0, 0.25, 1, 0;\nrectangle, -7.75, 5.5, 0, 0.25, 1, 0;\nline, -8, -6, 0, -8, 6, 2;\nline, -8, 6, 2, -8, 6, 0;\nline, 8, -6, 0, 8, 6, 2;\nline, 8, 6, 2, 8, 6, 0;\nassociated file, text-v;\ntotal mass, 50;\nendpixel;"
      },
      {
        "name": "Bomb",
        "author": "Alex",
        "source": "MODEL 21;\ndock, 2, 5, 2, 0, 5;\ncolumn, 0, 0, 0, 2, 2, 10, 9;\ntext, 0, 5, 0, 0.9, 0.9, 270, 0, *;\ntext, 0, 5, 0, 0.9, 0.9, 270, 22, *;\ntext, 0, -5, 0, 0.9, 0.9, 270, 0, *;\ntext, 0, -5, 0, 0.9, 0.9, 270, 22, *;\nline, 0, -5, 0, 0, -7, 0;\nasterisk, 0, -7, 0, 2, 36;\ntext, -1.4, 0, 0, 0.35, 0.6, 0, 0, TNT;\ntext, -1.4, 0, 0, 0.35, 0.6, 0, 0, TNT;\ntext, -1.4, 0, 0, 0.35, 0.6, 0, 0, TNT;\ntext, -1.8, -2, 0, 0.112, 0.15, 0, 0, DANGER:;\ntext, -1.8, 2, 0, 0.065, 0.1, 0, 0, TRINITROTOLUENE;\nassociated file, bomb;\ntotal mass, 50;\nendpixel;"
      },
      {
        "name": "Candle",
        "author": "Alex",
        "source": "MODEL 22;\ndock, 0.5, 4, 0.5, 0, 4;\ncolumn, 0, 0, 0, 0.5, 0.5, 8, 18;\ncolumn, 0, -5, 0, 0, 0.25, 1, 36;\ncolumn, 0, -6.5, 0, 0.25, 0, 2, 36;\ntotal mass, 50;\nendpixel;"
      },
      {
        "name": "Doily? #1",
        "author": "Alex",
        "source": "MODEL 23;\ndock, 50, 0, 50, 0, 0;\nellipse, 0, 0, 0, 50, 50, 1, 90;\nrectangle, 0, 0, 0, 33.35, 33.35, 1;\ncolumn, 0, 0, 0, 62, 70, 0, 30;\ntotal mass, 500;\nendpixel;"
      },
      {
        "name": "Broken Railing? #1",
        "author": "Alex",
        "source": "MODEL 24;\ndock, 50, 20, 2, 0, 20;\nbox, -35, -18, 0, 15, 2, 2;\nbox, -45, 2, 0, 1, 18.5, 1;\nbox, -35, 2, 0, 1, 18.5, 1;\nbox, -25, 2, 0, 1, 18.5, 1;\nbox, 35, -18, 0, 15, 2, 2;\nbox, 25, 2, 0, 1, 18.5, 1;\nbox, 35, 2, 0, 1, 18.5, 1;\nbox, 45, 2, 0, 1, 18.5, 1;\ntotal mass, 150;\nendpixel;"
      },
      {
        "name": "Broken Railing? #2",
        "author": "Alex",
        "source": "MODEL 25;\ndock, 2, 20, 50, 0, 20;\nbox, 0, -18, -35, 2, 2, 15;\nbox, 0, 2, -45, 1, 18.5, 1;\nbox, 0, 2, -35, 1, 18.5, 1;\nbox, 0, 2, -25, 1, 18.5, 1;\nbox, 0, -18, 25, 2, 2, 15;\nbox, 0, 2, 15, 1, 18.5, 1;\nbox, 0, 2, 25, 1, 18.5, 1;\nbox, 0, 2, 35, 1, 18.5, 1;\ntotal mass, 150;\nendpixel;"
      },
      {
        "name": "Doily? #2",
        "author": "Alex",
        "source": "MODEL 26;\ndock, 4.5, 0.2, 4.5, 0, 0;\nrectangle, 0, 0, 0, 4.5, 4.5, 1;\ntotal mass, 100;\nendpixel;"
      },
      {
        "name": "Blackboard (horizontal) #2",
        "author": "Alex",
        "source": "MODEL 27;\ndock, 0, 0, 0, 0, 0;\nrectangle, 0, 0, 0, 7.5, 6, 1;\nrectangle, 0, 0, 0, 8, 6.5, 1;\nrectangle, 7, 0, 6.25, 1, 0.25, 1;\nrectangle, -7, 0, 6.25, 1, 0.25, 1;\nrectangle, 7, 0, -6.25, 1, 0.25, 1;\nrectangle, -7, 0, -6.25, 1, 0.25, 1;\nrectangle, 7.75, 0, 5.5, 0.25, 1, 1;\nrectangle, -7.75, 0, 5.5, 0.25, 1, 1;\nrectangle, 7.75, 0, -5.5, 0.25, 1, 1;\nrectangle, -7.75, 0, -5.5, 0.25, 1, 1;\nassociated file, text-h;\ntotal mass, 50;\nendpixel;"
      },
      {
        "name": "Blackboard (vertical) #4",
        "author": "Alex",
        "source": "MODEL 28;\ndock, 0, 0, 0, 0, 6.5;\nrectangle, 0, 0, 0, 7.5, 6, 0;\nrectangle, 0, 0, 0, 8, 6.5, 0;\nrectangle, 7, -6.25, 0, 1, 0.25, 0;\nrectangle, -7, -6.25, 0, 1, 0.25, 0;\nrectangle, 7, 6.25, 0, 1, 0.25, 0;\nrectangle, -7, 6.25, 0, 1, 0.25, 0;\nrectangle, 7.75, -5.5, 0, 0.25, 1, 0;\nrectangle, -7.75, -5.5, 0, 0.25, 1, 0;\nrectangle, 7.75, 5.5, 0, 0.25, 1, 0;\nrectangle, -7.75, 5.5, 0, 0.25, 1, 0;\nline, -8, -6, 0, -8, 6, 2;\nline, -8, 6, 2, -8, 6, 0;\nline, 8, -6, 0, 8, 6, 2;\nline, 8, 6, 2, 8, 6, 0;\nassociated file, text-v;\ntotal mass, 50;\nendpixel;"
      },
      {
        "name": "Glasses",
        "author": "Alex",
        "source": "MODEL 29;\ndock, 0, 0, 0, 0, 0;\nrectangle, 1.5, 0, 0, 0.75, 0.5, 0;\nrectangle, -1.5, 0, 0, 0.75, 0.5, 0;\nline, -0.75, 0, 0, -0.25, -0.5, 0;\nline, -0.25, -0.5, 0, 0.25, -0.5, 0;\nline, 0.25, -0.5, 0, 0.75, 0, 0;\nline, -2.25, 0, 0, -2.25, 0, -3;\nline, -2.25, 0, -3, -2.25, 0.5, -3.5;\nline, 2.25, 0, 0, 2.25, 0, -3;\nline, 2.25, 0, -3, 2.25, 0.5, -3.5;\nassociated file, magnify;\ntotal mass, 25;\nendpixel;"
      },
      {
        "name": "Blackboard (vertical) #5",
        "author": "Alex",
        "source": "MODEL 30;\ndock, 0, 0, 0, 0, 6.5;\nrectangle, 0, 0, 0, 7.5, 6, 0;\nrectangle, 0, 0, 0, 8, 6.5, 0;\nrectangle, 7, -6.25, 0, 1, 0.25, 0;\nrectangle, -7, -6.25, 0, 1, 0.25, 0;\nrectangle, 7, 6.25, 0, 1, 0.25, 0;\nrectangle, -7, 6.25, 0, 1, 0.25, 0;\nrectangle, 7.75, -5.5, 0, 0.25, 1, 0;\nrectangle, -7.75, -5.5, 0, 0.25, 1, 0;\nrectangle, 7.75, 5.5, 0, 0.25, 1, 0;\nrectangle, -7.75, 5.5, 0, 0.25, 1, 0;\nline, -8, -6, 0, -8, 6, 2;\nline, -8, 6, 2, -8, 6, 0;\nline, 8, -6, 0, 8, 6, 2;\nline, 8, 6, 2, 8, 6, 0;\nassociated file, text-v;\ntotal mass, 50;\nendpixel;"
      }
    ]
  }