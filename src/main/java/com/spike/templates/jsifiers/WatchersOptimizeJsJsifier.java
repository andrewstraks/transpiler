package com.spike.templates.jsifiers;

import com.spike.templates.compilers.CommonCompiler;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Created by ds931004 on 06.04.2018.
 */
public class WatchersOptimizeJsJsifier extends Jsifier {

    @Override
    public String jsify(String output) throws Exception {

        //for (int i = 0; i < CommonCompiler.generalCounter; i++) {
          //  output = output.replaceAll(Pattern.quote("__a"+i+"[1]+='';"), "");
       // }
//
//        output = output.replaceAll(Pattern.quote("t+=''+("), "");
//        output = output.replaceAll(Pattern.quote(")+'';"), "");

        Pattern p = Pattern.compile("(?s)(?=switch).*?(?<=case)");
        Matcher m = p.matcher(output);
        while (m.find()) {

            String matched = m.group();

            String contentToRemove = matched.substring(matched.indexOf("{")+1, matched.indexOf("case")).trim();

//            if(!contentToRemove.isEmpty()){
//                System.out.println("contentToRemove : "+contentToRemove);
//            }

            String replacement = matched.replace(contentToRemove, "");

            output = output.replace(matched, replacement);

        }


        return output;

    }

}
