package com.zcashjava.znl.framework.xss.core.clean;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.safety.Safelist;


public class JsoupXssCleaner implements XssCleaner {

    private final Safelist safelist;

    
    private final String baseUri;

    
    public JsoupXssCleaner() {
        this.safelist = buildSafelist();
        this.baseUri = "";
    }

    
    private Safelist buildSafelist() {
        
        Safelist relaxedSafelist = Safelist.relaxed();
        
        
        
        relaxedSafelist.addAttributes(":all", "style", "class");
        
        relaxedSafelist.addAttributes("a", "target");
        
        relaxedSafelist.addProtocols("img", "src", "data");

        
        

        
        
        
        
        return relaxedSafelist;
    }

    @Override
    public String clean(String html) {
        return Jsoup.clean(html, baseUri, safelist, new Document.OutputSettings().prettyPrint(false));
    }

}

