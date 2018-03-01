package com.spike;

/**
 * Created by ds931004 on 25.02.2018.
 */
public class Console {

    private static final int WHITE = 30;
    private static final int RED = 31;
    private static final int GREEN = 32;
    private static final int YELLOW = 33;
    private static final int BLUE = 34;
    private static final int PINK = 35;
    private static final int CYAN = 36;
    private static final int GRAY = 37;

    private static void print(String string, int color){
        //System.out.println((char) 27 + "[32;"+color+"m" + string);

        string = " "+string;
        System.out.println((char) 27 + "[7;"+color+"m" + string);
        System.out.print((char) 27 + "[1;"+WHITE+"m");

     //   for(int i = 1; i < 100; i++){
     //       System.out.println((char) 27 + "["+i+";"+color+"m" + string);
     //   }

    }

    public static void log(String string) {
        print(string, YELLOW);
    }

    public static void warn(String string) {
        print(string, GRAY);
    }

    public static void error(String string) {
        print(string, RED);
    }

}
