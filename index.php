<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JSON beautifier</title>
    <link rel="stylesheet" href="assets/css/app.css">
</head>
<body>
	<div id="app" class="container-fluid">
		<h1 class="heading">JSON beautifier</h1>
		<div class="viewer-grid">						
			<div class="viewer-grid__source">
				<textarea class="form-control viewer viewer--source" placeholder="Enter raw JSON here..." v-model="jsonString"></textarea>				
			</div>
			<div class="viewer-grid__preview">				
				<div class="viewer viewer--preview" v-show="beautified">					
					<button class="btn-copy" @click="copyToClipboard(beautified)">{{ copied ? 'Copied' : 'Copy' }}</button>
					<pre><code class="language-json" v-html="beautified"></code></pre>
				</div>
			</div>			
		</div>
	</div>

	<!-- JS LIBRARIES -->    
    <script src="assets/js/app.js"></script>	
</body>
</html>