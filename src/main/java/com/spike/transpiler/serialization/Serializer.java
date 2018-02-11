package com.spike.transpiler.serialization;

import com.spike.transpiler.ScriptsCompiler;

import java.io.*;
import java.util.HashMap;
import java.util.List;

public class Serializer {

    //To dla developerki - docelowo powinno byc po prostu w transpilerze w bower components
    //wtedy zawsze spike powinien budowac taki plik razem z jarką - jako aktualną mape konstruktorów

    public static String constructorsFilePath = "";

    public static void initSerializer(){
        constructorsFilePath = System.getProperty("java.io.tmpdir")+"spike\\";
        new File(constructorsFilePath).mkdirs();
        constructorsFilePath += ".constructors.bin";

        File temp = new File(constructorsFilePath);

        if(!temp.exists()){
            try {
                temp.createNewFile();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

    }

    public static void serializeConstructors(HashMap<String, List<String>> constructorsMap) {

        if(!ScriptsCompiler.SPIKE_COMPILATION){
            return;
        }

        //System.out.println("SERIALIZING");

        File temp = new File(constructorsFilePath);

        FileOutputStream fileOut = null;
        try {
            fileOut = new FileOutputStream(temp);
        } catch (Exception e) {
            e.printStackTrace();
        }

        ObjectOutputStream out = null;
        try {
            out = new ObjectOutputStream(fileOut);
        } catch (Exception e) {
            e.printStackTrace();
        }

        try {
            out.writeObject(constructorsMap);
        } catch (Exception e) {
            e.printStackTrace();
        }

        try {
            out.close();
        } catch (Exception e) {
            e.printStackTrace();
        }

        try {
            fileOut.close();
        } catch (Exception e) {
            e.printStackTrace();
        }

    }

    public static HashMap<String, List<String>> deserializeConstructors() {

        if( ScriptsCompiler.SPIKE_COMPILATION){
            return new HashMap<>();
        }

        File temp = new File(constructorsFilePath);

        FileInputStream fileIn = null;
        try {
            fileIn = new FileInputStream(temp);
        } catch (Exception e) {
           // e.printStackTrace();
        }

        ObjectInputStream in = null;
        try {
            in = new ObjectInputStream(fileIn);
        } catch (Exception e) {
           // e.printStackTrace();
        }

        HashMap<String, List<String>> constructorsMap = new HashMap<>();

        try {
            constructorsMap = (HashMap<String, List<String>>) in.readObject();
        } catch (Exception e) {
           // e.printStackTrace();
        }

        try {
            in.close();
        } catch (Exception e) {
           // e.printStackTrace();
        }

        try {
            fileIn.close();
        } catch (Exception e) {
          //  e.printStackTrace();
        }

        return constructorsMap;

    }

}
