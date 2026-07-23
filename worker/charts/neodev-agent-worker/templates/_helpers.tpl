{{- define "neodev-agent-worker.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{- define "neodev-agent-worker.fullname" -}}
{{- if .Values.fullnameOverride -}}
{{- .Values.fullnameOverride | trunc 63 | trimSuffix "-" -}}
{{- else -}}
{{- $name := include "neodev-agent-worker.name" . -}}
{{- if contains $name .Release.Name -}}
{{- .Release.Name | trunc 63 | trimSuffix "-" -}}
{{- else -}}
{{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" -}}
{{- end -}}
{{- end -}}
{{- end -}}

{{- define "neodev-agent-worker.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{- define "neodev-agent-worker.selectorLabels" -}}
app.kubernetes.io/name: {{ include "neodev-agent-worker.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end -}}

{{- define "neodev-agent-worker.labels" -}}
helm.sh/chart: {{ include "neodev-agent-worker.chart" . }}
{{ include "neodev-agent-worker.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end -}}

{{- define "neodev-agent-worker.serviceAccountName" -}}
{{- if .Values.serviceAccount.create -}}
{{- default (include "neodev-agent-worker.fullname" .) .Values.serviceAccount.name -}}
{{- else -}}
{{- required "serviceAccount.name is required when serviceAccount.create=false" .Values.serviceAccount.name -}}
{{- end -}}
{{- end -}}

{{- define "neodev-agent-worker.apiKeySecretName" -}}
{{- if .Values.warp.apiKeySecret.create -}}
{{- default (printf "%s-api-key" (include "neodev-agent-worker.fullname" .)) .Values.warp.apiKeySecret.name -}}
{{- else -}}
{{- required "warp.apiKeySecret.name is required when warp.apiKeySecret.create=false" .Values.warp.apiKeySecret.name -}}
{{- end -}}
{{- end -}}
