import { useState, useRef, useEffect, useCallback } from "react";
import { Document, Page, Outline, pdfjs } from "react-pdf";
import { 
  Upload, FileText, ZoomIn, ZoomOut, Maximize, 
  ChevronLeft, ChevronRight, Search, Menu, RotateCw, X,
  List, Info, Minimize
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

// Configure PDF.js worker for Vite
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

const SAMPLE_PDF = "data:application/pdf;base64,JVBERi0xLjcKCjEgMCBvYmogICUgZW50cnkgcG9pbnQKPDwKICAvVHlwZSAvQ2F0YWxvZwogIC9QYWdlcyAyIDAgUgo+PgplbmRvYmoKCjIgMCBvYmoKPDwKICAvVHlwZSAvUGFnZXMKICAvTWVkaWFCb3ggWyAwIDAgMjAwIDIwMCBdCiAgL0NvdW50IDEKICAvS2lkcyBbIDMgMCBSIF0KPj4KZW5kb2JqCgozIDAgb2JqCjw8CiAgL1R5cGUgL1BhZ2UKICAvUGFyZW50IDIgMCBSCiAgL1Jlc291cmNlcyA8PAogICAgL0ZvbnQgPDwKICAgICAgL0YxIDQgMCBSCj4+Cj4+CiAgL0NvbnRlbnRzIDUgMCBSCj4+CmVuZG9iagoKNCAwIG9iago8PAogIC9UeXBlIC9Gb250CiAgL1N1YnR5cGUgL1R5cGUxCiAgL0Jhc2VGb250IC9UaW1lcy1Sb21hbgo+PgplbmRvYmoKCjUgMCBvYmoKPDwKICAvTGVuZ3RoIDQzCj4+CnN0cmVhbQpCVEQvFjEgMTggVGYDMEUgMjAgVEQDKFNhbXBsZSBQREYgRG9jdW1lbnQpVEpFVAplbmRzdHJlYW0KZW5kb2JqCgp4cmVmCjAgNgowMDAwMDAwMDAwIDY1NTM1IGYgCjAwMDAwMDAwMTAgMDAwMDAgbiAKMDAwMDAwMDA2NyAwMDAwMCBuIAowMDAwMDAwMTUwIDAwMDAwIG4gCjAwMDAwMDAyNzkgMDAwMDAgbiAKMDAwMDAwMDM2NCAwMDAwMCBuIAp0cmFpbGVyCjw8CiAgL1NpemUgNgogIC9Sb290IDEgMCBSCj4+CnN0YXJ0eHJlZgo0NzAKJSVFT0YK";

export default function Home() {
  const [file, setFile] = useState<string | File | null>(null);
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.0);
  const [rotation, setRotation] = useState<number>(0);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [metadata, setMetadata] = useState<any>(null);
  const [fitToWidth, setFitToWidth] = useState(false);
  const [pageWidth, setPageWidth] = useState<number | undefined>(undefined);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const pageRefs = useRef<Array<HTMLDivElement | null>>([]);
  const activePdfWrapperRef = useRef<HTMLDivElement>(null);

  const onDocumentLoadSuccess = (pdf: any) => {
    setNumPages(pdf.numPages);
    setPageNumber(1);
    pageRefs.current = new Array(pdf.numPages).fill(null);
    
    // Extract metadata
    pdf.getMetadata().then((data: any) => {
      setMetadata(data.info);
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) setFile(files[0]);
  };

  const handleDragOver = (e: React.DragEvent) => e.preventDefault();
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const scrollToPage = (pageNum: number) => {
    setPageNumber(pageNum);
    const element = document.getElementById(`page_${pageNum}`);
    if (element && containerRef.current) {
      // Find the element relative to its scroll container
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const scrollPosition = container.scrollTop;
    const containerHeight = container.clientHeight;
    const viewCenter = scrollPosition + containerHeight / 3; // Use top third as focal point

    let closestPage = pageNumber;
    let minDistance = Infinity;

    pageRefs.current.forEach((pageEl, index) => {
      if (!pageEl) return;
      const pageTop = pageEl.offsetTop;
      const pageHeight = pageEl.offsetHeight;
      const pageCenter = pageTop + pageHeight / 2;
      
      const distance = Math.abs(viewCenter - pageCenter);
      
      // Also consider if the page is currently taking up most of the view
      if (pageTop <= scrollPosition + containerHeight && pageTop + pageHeight >= scrollPosition) {
        if (distance < minDistance) {
          minDistance = distance;
          closestPage = index + 1;
        }
      }
    });

    if (closestPage !== pageNumber && closestPage > 0 && closestPage <= numPages) {
      setPageNumber(closestPage);
    }
  }, [pageNumber, numPages]);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll, { passive: true });
      return () => container.removeEventListener('scroll', handleScroll);
    }
    return undefined;
  }, [handleScroll]);

  // Adjust zoom for fit-to-width
  useEffect(() => {
    if (fitToWidth && containerRef.current && pageWidth) {
      // Leave some padding
      const containerWidth = containerRef.current.clientWidth - 48;
      const newScale = containerWidth / pageWidth;
      setScale(newScale);
    }
  }, [fitToWidth, sidebarOpen, isFullscreen]); // Re-calculate when sidebar toggles

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      activePdfWrapperRef.current?.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
  }, []);

  const highlightPattern = (text: string, pattern: string) => {
    if (!pattern) return text;
    const parts = text.split(new RegExp(`(${pattern})`, 'gi'));
    return parts.map((part, i) => 
      part.toLowerCase() === pattern.toLowerCase() ? 
        `<mark class="bg-accent text-accent-foreground rounded-sm px-0.5" key="${i}">${part}</mark>` : part
    ).join('');
  };

  if (!file) {
    return (
      <div 
        className="min-h-screen w-full flex flex-col items-center justify-center bg-background p-6"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className="max-w-md w-full bg-card border shadow-sm rounded-xl p-12 text-center flex flex-col items-center gap-6 animate-in fade-in zoom-in-95 duration-500">
          <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
            <FileText className="h-10 w-10 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold mb-2 text-foreground">Reader</h1>
            <p className="text-muted-foreground leading-relaxed">
              A calm, focused space for your documents. Drag and drop a PDF here, or select a file to begin reading.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full mt-4">
            <Button className="flex-1 h-11 transition-all active:scale-95" onClick={() => fileInputRef.current?.click()}>
              <Upload className="mr-2 h-4 w-4" /> Open File
            </Button>
            <Button variant="secondary" className="flex-1 h-11 transition-all active:scale-95" onClick={() => setFile(SAMPLE_PDF)}>
              Load Sample
            </Button>
          </div>
          <input 
            type="file" 
            accept="application/pdf" 
            className="hidden" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
          />
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-full flex flex-col bg-background overflow-hidden text-foreground" ref={activePdfWrapperRef}>
      {/* Top Toolbar */}
      <header className="h-14 border-b bg-card flex items-center justify-between px-2 sm:px-4 shrink-0 z-10 transition-colors">
        <div className="flex items-center gap-1 sm:gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)} className="text-muted-foreground hover:text-foreground">
                <Menu className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Toggle Sidebar</TooltipContent>
          </Tooltip>
          <div className="h-6 w-[1px] bg-border mx-1" />
          <h1 className="font-medium text-sm truncate max-w-[120px] sm:max-w-xs text-foreground">
            {file instanceof File ? file.name : "Document"}
          </h1>
          
          {metadata && (
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 ml-1 text-muted-foreground">
                  <Info className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="space-y-3">
                  <h4 className="font-medium leading-none">Document Properties</h4>
                  <Separator />
                  <div className="text-sm space-y-2">
                    <div className="grid grid-cols-3 gap-2">
                      <span className="text-muted-foreground">Title:</span>
                      <span className="col-span-2 truncate" title={metadata.Title}>{metadata.Title || 'Unknown'}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <span className="text-muted-foreground">Author:</span>
                      <span className="col-span-2 truncate" title={metadata.Author}>{metadata.Author || 'Unknown'}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <span className="text-muted-foreground">Creator:</span>
                      <span className="col-span-2 truncate" title={metadata.Creator}>{metadata.Creator || 'Unknown'}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <span className="text-muted-foreground">Pages:</span>
                      <span className="col-span-2">{numPages}</span>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          <div className="flex items-center bg-muted/50 rounded-md border px-1">
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => scrollToPage(Math.max(1, pageNumber - 1))} disabled={pageNumber <= 1}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <form onSubmit={(e) => {
              e.preventDefault();
              const val = (e.currentTarget.elements.namedItem('pageNum') as HTMLInputElement).value;
              const num = parseInt(val, 10);
              if (!isNaN(num) && num > 0 && num <= numPages) scrollToPage(num);
            }} className="flex items-center">
              <input 
                name="pageNum"
                type="number"
                min={1}
                max={numPages}
                value={pageNumber}
                onChange={(e) => setPageNumber(parseInt(e.target.value) || pageNumber)}
                className="w-10 text-center bg-transparent border-none focus:ring-0 text-sm font-medium tabular-nums p-0"
              />
              <span className="text-sm font-medium text-muted-foreground pr-2">/ {numPages || '-'}</span>
            </form>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => scrollToPage(Math.min(numPages, pageNumber + 1))} disabled={pageNumber >= numPages}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <Separator orientation="vertical" className="h-6 mx-1 hidden sm:block" />

          <div className="hidden sm:flex items-center gap-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={() => { setFitToWidth(false); setScale(s => Math.max(0.25, s - 0.25)); }}>
                  <ZoomOut className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Zoom Out</TooltipContent>
            </Tooltip>
            
            <div className="w-16 flex items-center justify-center">
              <Button variant="ghost" className="h-8 px-2 text-xs tabular-nums" onClick={() => { setFitToWidth(!fitToWidth); if(fitToWidth) setScale(1); }}>
                {fitToWidth ? 'Fit' : `${Math.round(scale * 100)}%`}
              </Button>
            </div>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={() => { setFitToWidth(false); setScale(s => Math.min(3, s + 0.25)); }}>
                  <ZoomIn className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Zoom In</TooltipContent>
            </Tooltip>
          </div>

          <Separator orientation="vertical" className="h-6 mx-1 hidden sm:block" />

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="hidden sm:inline-flex text-muted-foreground hover:text-foreground" onClick={() => setRotation((rotation + 90) % 360)}>
                <RotateCw className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Rotate</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={toggleFullscreen} className="text-muted-foreground hover:text-foreground">
                {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
              </Button>
            </TooltipTrigger>
            <TooltipContent>{isFullscreen ? "Exit Fullscreen" : "Fullscreen"}</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={() => setFile(null)} className="text-destructive hover:bg-destructive/10 hover:text-destructive">
                <X className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Close Document</TooltipContent>
          </Tooltip>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        {sidebarOpen && (
          <aside className="w-64 border-r bg-card flex flex-col shrink-0 transition-all duration-300 animate-in slide-in-from-left-4">
            <Tabs defaultValue="thumbnails" className="flex-1 flex flex-col">
              <div className="px-4 pt-3 pb-2 border-b">
                <TabsList className="w-full grid grid-cols-2">
                  <TabsTrigger value="thumbnails" className="text-xs">Pages</TabsTrigger>
                  <TabsTrigger value="outline" className="text-xs">Outline</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="thumbnails" className="flex-1 flex flex-col m-0 data-[state=active]:flex">
                <div className="p-3 border-b border-border/50 shrink-0">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="Find in document..." 
                      className="pl-9 h-9 bg-background/50 border-border/50 focus:bg-background transition-colors"
                      value={searchText}
                      onChange={(e) => setSearchText(e.target.value)}
                    />
                  </div>
                </div>
                <ScrollArea className="flex-1">
                  <div className="flex flex-col gap-4 items-center p-4">
                    {Array.from(new Array(numPages), (el, index) => (
                      <button 
                        key={`thumb_${index + 1}`}
                        onClick={() => scrollToPage(index + 1)}
                        className={`relative rounded-md overflow-hidden border-2 transition-all duration-200 group ${
                          pageNumber === index + 1 ? "border-primary shadow-sm" : "border-transparent hover:border-border"
                        }`}
                      >
                        <div className="bg-white pointer-events-none w-32 relative">
                          <Document file={file}>
                            <Page 
                              pageNumber={index + 1} 
                              width={128} 
                              renderTextLayer={false} 
                              renderAnnotationLayer={false}
                            />
                          </Document>
                          {pageNumber !== index + 1 && (
                            <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                          )}
                        </div>
                        <div className="absolute bottom-1 right-1 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded font-medium backdrop-blur-sm">
                          {index + 1}
                        </div>
                      </button>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>
              
              <TabsContent value="outline" className="flex-1 m-0 data-[state=active]:flex">
                <ScrollArea className="flex-1 p-4">
                  <div className="text-sm">
                    <Document file={file}>
                      <Outline 
                        onItemClick={({ pageNumber }) => {
                          if(typeof pageNumber === 'number') scrollToPage(pageNumber);
                        }} 
                        className="react-pdf__Outline text-muted-foreground hover:text-foreground transition-colors outline-none"
                      />
                    </Document>
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </aside>
        )}

        {/* PDF Viewer */}
        <main 
          className="flex-1 bg-muted/40 overflow-auto relative scroll-smooth" 
          ref={containerRef}
        >
          <div className="min-h-full flex flex-col items-center justify-start py-8 px-4 sm:px-8">
            <Document
              file={file}
              onLoadSuccess={onDocumentLoadSuccess}
              loading={
                <div className="animate-pulse text-muted-foreground flex flex-col items-center gap-3 mt-20">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <FileText className="h-6 w-6 opacity-50" />
                  </div>
                  <span className="font-medium">Loading document...</span>
                </div>
              }
              error={
                <div className="text-destructive font-medium p-6 bg-destructive/10 rounded-lg mt-20 border border-destructive/20 flex flex-col items-center gap-3 max-w-sm text-center">
                  <X className="h-8 w-8" />
                  <span>Failed to load PDF. The file might be corrupted or in an unsupported format.</span>
                  <Button variant="outline" onClick={() => setFile(null)} className="mt-2">Try another file</Button>
                </div>
              }
              className="flex flex-col items-center gap-8 w-full"
            >
              {Array.from(new Array(numPages), (el, index) => (
                <div 
                  key={`page_${index + 1}`} 
                  id={`page_${index + 1}`}
                  ref={el => { pageRefs.current[index] = el; }}
                  className="relative group transition-transform duration-300"
                  style={{ width: fitToWidth ? '100%' : 'auto', maxWidth: '1000px' }}
                >
                  <Page
                    pageNumber={index + 1}
                    scale={fitToWidth ? undefined : scale}
                    width={fitToWidth ? containerRef.current?.clientWidth ? containerRef.current.clientWidth - 48 : undefined : undefined}
                    rotate={rotation}
                    className="shadow-md rounded-sm overflow-hidden bg-white ring-1 ring-border/50"
                    renderTextLayer={true}
                    renderAnnotationLayer={true}
                    onLoadSuccess={(page) => {
                      if (index === 0) setPageWidth(page.originalWidth);
                    }}
                    customTextRenderer={({ str }) => highlightPattern(str, searchText)}
                  />
                  <div className="absolute -left-10 sm:-left-16 top-0 h-full flex items-start py-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none hidden md:flex">
                    <div className="bg-card text-muted-foreground text-xs font-medium px-2.5 py-1 rounded-md shadow-sm border">
                      {index + 1}
                    </div>
                  </div>
                </div>
              ))}
            </Document>
          </div>
        </main>
      </div>
    </div>
  );
}
