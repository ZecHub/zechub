// Any plugins you want to setting has to be imported
// Detail plugins list see https://www.tiny.cloud/docs/plugins/
// Custom builds see https://www.tiny.cloud/download/custom-builds/
// colorpicker/contextmenu/textcolor plugin is now built in to the core editor, please remove it from your editor configuration

export const plugins =
  'preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help emoticons accordion';

// Unlike vben2.0, from https://www.tiny.clud/ copy of the Vue section and then remove the importword exit exportpdf section  math section and add the last line (from vben 2.0 difference section)
export const toolbar =
  'undo redo | accordion accordionremove | \\\n' +
  '          blocks fontfamily fontsize | bold italic underline strikethrough | \\\n' +
  '          align numlist bullist | link image | table media | \\\n' +
  '          lineheight outdent indent | forecolor backcolor removeformat | \\\n' +
  '          charmap emoticons | code fullscreen preview | save print | \\\n' +
  '          pagebreak anchor codesample | ltr rtl | \\\n' +
  '          hr searchreplace alignleft aligncenter alignright blockquote subscript superscript';