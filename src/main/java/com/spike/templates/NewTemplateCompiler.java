package com.spike.templates;

import com.spike.templates.processors.*;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.nodes.Node;
import org.jsoup.select.Elements;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by Dawid on 2017-09-03.
 */
public class NewTemplateCompiler {

    public static final String TEMPLATE_SPIKE = "@template";
    public static final String INCLUDE_SPIKE = "app.partial.include";
    public static final String JS_HINT_LINE = "#js__line#";
    public static final String JS_HINT_BEGIN = "#js__begin#";
    public static final String JS_HINT_END = "#js__end#";
    public static final String PREFIX = "[";
    public static final String SUFFIX = "]";
    public static final String BRACKET_LEFT = "[[";
    public static final String BRACKET_RIGHT = "]]";
    public static final  String PARAMS = U.s("params");

    String getFileName(File templateFile) {return templateFile.getPath().replaceAll("\\\\", "/");}


    public static HashMap<String, Processor> commands = new HashMap<>();

    static {

        EventProcessor eventProcessor = new EventProcessor();

        commands.put(U.s("print"), new PrintProcessor());
        commands.put(U.s("translation"), new TranslationProcessor());
        commands.put(U.s("placeholder"), new TranslationProcessor());
        commands.put(U.s("if"), new IfProcessor());
        commands.put(U.s("elseif"), new ElseIfProcessor());
        commands.put(U.s("else"), new ElseProcessor());
        commands.put(U.s("switch"), new SwitchProcessor());
        commands.put(U.s("case"), new CaseProcessor());
        commands.put(U.s("default"), new DefaultProcessor());
        commands.put(U.s("for"), new ForProcessor());
        commands.put(U.s("foreach"), new ForEachProcessor());
        commands.put(U.s("while"), new WhileProcessor());
        commands.put(U.s("click"), eventProcessor);
        commands.put(U.s("change"), eventProcessor);
        commands.put(U.s("keyup"), eventProcessor);
        commands.put(U.s("keydown"), eventProcessor);
        commands.put(U.s("keypress"), eventProcessor);
        commands.put(U.s("blur"), eventProcessor);
        commands.put(U.s("focus"), eventProcessor);
        commands.put(U.s("dblclick"), eventProcessor);
        commands.put(U.s("die"), eventProcessor);
        commands.put(U.s("hover"), eventProcessor);
        commands.put(U.s("keydown"), eventProcessor);
        commands.put(U.s("mousemove"), eventProcessor);
        commands.put(U.s("mouseover"), eventProcessor);
        commands.put(U.s("mouseenter"), eventProcessor);
        commands.put(U.s("mousedown"), eventProcessor);
        commands.put(U.s("mouseleave"), eventProcessor);
        commands.put(U.s("mouseout"), eventProcessor);
        commands.put(U.s("submit"), eventProcessor);
        commands.put(U.s("trigger"), eventProcessor);
        commands.put(U.s("toggle"), eventProcessor);
        commands.put(U.s("load"), eventProcessor);
        commands.put(U.s("unload"), eventProcessor);
        commands.put(U.s("template"), new TemplateProcessor());
        commands.put(U.s("include"), new IncludeProcessor());
        commands.put(U.s("js"), new JsProcessor());
        commands.put(U.s("spike-href"), new HrefProcessor());
    }

    public String parseSpikeTemplate(File templateFile, String rootDir, String template) throws Exception {

        long start = System.currentTimeMillis();

        Document doc = Jsoup.parseBodyFragment(template);
        removeComments(doc);

        for (Map.Entry<String, Processor> entry : commands.entrySet()) {
            String spikeAttribute = entry.getKey();
            Processor processor = entry.getValue();

            Elements spikeElements = doc.getElementsByAttribute(spikeAttribute);

            for (Element element : spikeElements) {
                processor.process(element, spikeAttribute);
            }

        }


        String output = doc.outerHtml();
        output = output.replace("<html>","").replace("</html>","").replace("<head></head>","").replace("<body>","").replace("</body>","");
        output = output.replaceAll("<spike>", "").replaceAll("</spike>","");
        output = ProcessorUtils.replaceBrackets(output);


        StringBuilder stringBuilder = new StringBuilder(output.length());
        for(String line : output.split("\n")){
            line = ProcessorUtils.replaceJS(line);
            stringBuilder.append(line+"\n");
        }

        output = stringBuilder.toString();
        stringBuilder = new StringBuilder(output.length());
        for(String line : output.split("\n")){

            System.out.println(line);

            line = line.trim();
            if(line.length() > 0){

                if(line.indexOf(NewTemplateCompiler.JS_HINT_LINE) > -1){
                    stringBuilder.append(line.replace(NewTemplateCompiler.JS_HINT_LINE, ""));
                }else{

                    if(line.endsWith("+'")){
                        line = line.substring(0, line.length()-2);
                    }else{
                        line = line+"'";
                    }

                    stringBuilder.append(("t+='"+line+";").replace("+=''+","+="));

                }

            }

        }

        //TODO replace all $local with some short
       // output = output.replaceAll([\\$local\], "_l");
        output = "Templates.templates['"+templateFile.getPath()+"']=function(model){var t='';" + stringBuilder.toString() +" return t;}";

        for(String line : output.split("\n")){
            System.out.println(line);
        }

        System.out.println("takes : " + (System.currentTimeMillis()-start));

        return null;
    }

    public static void removeComments(Node node) {
        for (int i = 0; i < node.childNodes().size();) {
            Node child = node.childNode(i);
            if (child.nodeName().equals("#comment")) child.remove();
            else {
                removeComments(child);
                i++;
            }
        }
    }

}
