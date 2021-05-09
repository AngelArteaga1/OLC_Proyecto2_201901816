import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Simbolo } from '../../modules/simbolo';
import { Error } from '../../modules/Error/error';
import { Observable } from 'rxjs';
//importamos para el editor
import { filter, take } from 'rxjs/operators';
import {
  MonacoEditorComponent,
  MonacoEditorConstructionOptions,
  MonacoEditorLoaderService,
  MonacoStandaloneCodeEditor
} from '@materia-ui/ngx-monaco-editor';
import { AnalizarService } from 'src/app/services/analizar/analizar.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  @ViewChild(MonacoEditorComponent, { static: false })
  monacoComponent: MonacoEditorComponent = new MonacoEditorComponent(this.monacoLoaderService);
  editorOptions: MonacoEditorConstructionOptions = {
    theme: 'myCustomTheme',
    language: 'javascript',
    roundedSelection: true,
    autoIndent:"full"
  };
  consoleOptions: MonacoEditorConstructionOptions = {
    theme: 'myCustomTheme',
    language: '',
    roundedSelection: true,
    autoIndent:"full",
    readOnly:true
  };

  code = "";
  listaSimbolos: Simbolo[];
  listaErrores: Error[];
  editorTexto = new FormControl('');
  console = "";
  consola = new FormControl('');
  showSimbolos = false;
  showErrores = false;
  showConsolas = true;
  showArbol = false;
  arbolito = "assets/images/AST.png ";

  constructor(private monacoLoaderService: MonacoEditorLoaderService, private analizarService: AnalizarService) {
    this.monacoLoaderService.isMonacoLoaded$
      .pipe(
        filter(isLoaded => isLoaded),
        take(1)
      )
      .subscribe(() => {
        monaco.editor.defineTheme('myCustomTheme', {
          base: 'vs-dark', // can also be vs or hc-black
          inherit: true, // can also be false to completely replace the builtin rules
          rules: [
            {
              token: 'comment',
              foreground: 'ffa500',
              fontStyle: 'italic underline'
            },
            { token: 'comment.js', foreground: '008800', fontStyle: 'bold' },
            { token: 'comment.css', foreground: '0000ff' } // will inherit fontStyle from `comment` above
          ],
          colors: {}
        });
      });
      this.listaSimbolos = []
      this.listaErrores = []
  }
  editorInit(editor: MonacoStandaloneCodeEditor) {
    // monaco.editor.setTheme('vs');
    editor.setSelection({
      startLineNumber: 1,
      startColumn: 1,
      endColumn: 50,
      endLineNumber: 3
    });
  }

  ngOnInit(): void {
  }

  imprimir(){
    console.log(this.consola.value)
    console.log(this.editorTexto.value)
  }

  analizar(){
    var texto = {
      prueba: this.editorTexto.value
    }
    this.analizarService.ejecutar(texto).subscribe((res:any)=>{
      this.showErrores = false
      this.showSimbolos = false
      this.showConsolas = true
      this.showArbol = false
      console.log(res)
      this.consola.setValue(res.consola);
      this.listaSimbolos = res.tablaSimbolos;
      this.listaErrores = res.tablaErrores;
      console.log(res.tablaSimbolos);
    }, err=>{
      this.consola.setValue("ERROR");
      console.log(err)
    });
  }

  generar(){
    this.analizarService.generarAST().subscribe((res:any)=>{
      this.showConsolas = false
      this.showErrores = false
      this.showSimbolos = false
      this.showArbol = true
    }, err=>{
      this.consola.setValue("ERROR");
    });
  }

}
