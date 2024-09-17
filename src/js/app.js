import { createApp, computed, ref } from 'vue/dist/vue.esm-bundler';
import Prism from 'prismjs';
import 'prismjs/components/prism-json'; // import JSON language support

const app = createApp({			
    setup() {
        const jsonString = ref('');
        // Beautify JSON function
        const beautified = computed(() => {
            try {
                const parsedData = JSON.parse(jsonString.value);
                return highlightJson(JSON.stringify(parsedData, null, 4));
            } catch (error) {                
                return jsonString.value;
            }
        })
        const copied = ref(false);

        // Highlight JSON function
        function highlightJson(jsonStr) {
            const escapedString = jsonStr.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); // escape HTML characters

            const highlightedString = Prism.highlight(escapedString, Prism.languages.json, 'json');

            return highlightedString;
        }

        function copyToClipboard(renderedHtml) {
            // Create a temporary container element
            const container = document.createElement('div');
            container.innerHTML = renderedHtml;

            // Extract the plain text content from the container
            const text = container.innerText;

            const textarea = document.createElement('textarea');
            textarea.value = text;

            // Set non-editable to avoid focus and move outside of view
            textarea.setAttribute('readonly', '');
            textarea.style.position = 'absolute';
            textarea.style.left = '-9999px';

            document.body.appendChild(textarea);

            textarea.select();
            document.execCommand('copy');

            document.body.removeChild(textarea);
            copied.value = true;
            setTimeout(() => copied.value = false, 500)
        }

        return { copied, jsonString, beautified, copyToClipboard }
    }
});

app.mount('#app');