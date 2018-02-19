package com.spike.templates;

import com.spike.templates.processors.*;
import org.apache.commons.lang.StringEscapeUtils;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.nodes.Entities;
import org.jsoup.nodes.Node;
import org.jsoup.select.Elements;

import java.io.File;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by Dawid on 2017-09-03.
 */
public class TemplateCompiler {

    public static final String TEMPLATE_SPIKE = "@template";
    public static final String INCLUDE_SPIKE = "app.partial.include";
    public static final String JS_HINT_LINE = "#js__line#";
    public static final String JS_HINT_BEGIN = "#js__begin#";
    public static final String JS_HINT_END = "#js__end#";
    public static final String PREFIX = "sp-";
    public static final String SUFFIX = "";
    public static final String BRACKET_QUOTE_LEFT = "{{{";
    public static final String BRACKET_QUOTE_RIGHT = "}}}";
    public static final String BRACKET_LEFT = "{{";
    public static final String BRACKET_RIGHT = "}}";
    public static final  String PARAMS = U.s("params");

    public static String PROJECT = "";
    public static String ENV = "";

    public static boolean OLD_VERSION = false ;

    String getFileName(File templateFile) {return templateFile.getPath().replaceAll("\\\\", "/");}

    public static HashMap<String, Processor> commands = new HashMap<>();
    public static HashMap<String, Processor> watchCommands = new HashMap<>();

    static {

        EventProcessor eventProcessor = new EventProcessor();

        /**
         * Replacers
         */
        commands.put(U.s("project"), new ProjectIfProcessor());
        commands.put(U.s("not-project"), new ProjectNotIfProcessor());
        commands.put(U.s("env"), new EnvIfProcessor());

        commands.put(U.s("print"), new PrintProcessor());
        commands.put(U.s("translation"), new TranslationProcessor());
        commands.put(U.s("placeholder"), new TranslationProcessor());
        commands.put(U.s("if"), new IfProcessor());
        commands.put(U.s("else-if"), new ElseIfProcessor());
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
        commands.put(U.s("href"), new HrefProcessor());

        /**
         * Watchers
         */
        watchCommands.put(U.s("watch"), new WatchProcessor());
        watchCommands.put(U.s("bind"), new BindProcessor());
    }

    public String[] parseSpikeTemplate(File templateFile, String rootDir, String template) throws Exception {

        Document doc = Jsoup.parseBodyFragment(template);
        removeComments(doc);

        this.compileProcessors(doc, commands);

        String plainTemplate = this.processPlainTemplate(doc, templateFile);
        String watchTemplate = TemplateCompiler.OLD_VERSION ? "" : this.processWatchTemplate(doc, templateFile);

        if(!TemplateCompiler.OLD_VERSION){
            plainTemplate = "spike.core.Assembler.sourcePath='" + rootDir.substring(0, rootDir.lastIndexOf("/")) + "';" + plainTemplate;
        }

        return new String[] { plainTemplate, watchTemplate };
    }

    private String processWatchTemplate(Document doc, File templateFile) throws Exception {

        this.compileProcessors(doc, watchCommands);

        String output = doc.outerHtml();
        output = output.replace("<html>","").replace("</html>","").replace("<head></head>","").replace("<body>","").replace("</body>","");
        output = output.replaceAll("<spike>", "").replaceAll("</spike>","");
        output = ProcessorUtils.replaceBrackets(output);

        StringBuilder stringBuilder = new StringBuilder(output.length());
        for(String line : output.split("\n")){
            line = ProcessorUtils.replaceJS(line);
            line = ProcessorUtils.escapeSingleQuotes(line);
            stringBuilder.append(line+"\n");
        }

        output = stringBuilder.toString();
        output = this.processJSHints(output);

        output = "spike.core.Watchers.watchers['"+templateFile.getPath().replaceAll("\\\\","_").replace(".","_")+"']=function(scope, watcher){var t='';" + this.replaceEscapes(output) +" return t;};";

        return output;

    }

    private String processJSHints(String output){

        StringBuilder stringBuilder = new StringBuilder(output.length());
        for(String line : output.split("\n")){

            line = line.trim();
            if(line.length() > 0){

                if(line.contains(TemplateCompiler.JS_HINT_LINE)){
                    stringBuilder.append(line.replace(TemplateCompiler.JS_HINT_LINE, ""));
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

        return stringBuilder.toString();

    }

    private static int componentId = 0;
    private void compileProcessors(Document doc, HashMap<String, Processor> processorHashMap) throws Exception {

        for (Map.Entry<String, Processor> entry : processorHashMap.entrySet()) {
            String spikeAttribute = entry.getKey();
            Processor processor = entry.getValue();

            Elements spikeElements = doc.getElementsByAttribute(spikeAttribute);

            for (Element element : spikeElements) {
                processor.process(element, spikeAttribute);
            }

        }

        if(!TemplateCompiler.OLD_VERSION){

            Element fistElement = doc.body().children().first();
            if(fistElement.attr("id").isEmpty()){
                componentId++;
                fistElement.attr("id", "component"+componentId);
            }

        }

    }

    private String processPlainTemplate(Document doc, File templateFile){

        String output = doc.outerHtml();
        output = output.replace("<html>","").replace("</html>","").replace("<head></head>","").replace("<body>","").replace("</body>","");
        output = output.replaceAll("<spike>", "").replaceAll("</spike>","");
       // output = ProcessorUtils.replaceBrackets(output);

        StringBuilder stringBuilder = new StringBuilder(output.length());
        for(String line : output.split("\n")){
            line = ProcessorUtils.replaceJS(line);
            line = ProcessorUtils.escapeSingleQuotes(line);
            stringBuilder.append(line+"\n");
        }

        output = stringBuilder.toString();
        output = this.processJSHints(output);
        output = this.replaceEscapes(output);
        output = ProcessorUtils.replaceBrackets(output);

        if(TemplateCompiler.OLD_VERSION){
            output = "; window['_spike_templates']['" + getFileName(templateFile) + "']=function(model){var t='';" + output +" return t;};";
        }else{
            output = "spike.core.Templates.templates['"+templateFile.getPath().replaceAll("\\\\","_").replace(".","_")+"']=function(scope){var t='';" + output +" return t;};";
        }

        return output;

    }

    public String replaceEscapes(String template){

        template = template.replaceAll("&amp;", "&");
        template = template.replaceAll("amp;", "");
        template = template.replaceAll("&lt;", "<");
        template = template.replaceAll("&gt;", ">");
        template = template.replaceAll("&le;", "<=");
        template = template.replaceAll("&ge;", ">=");

        return template;
    }

    public void removeComments(Node node) {
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
