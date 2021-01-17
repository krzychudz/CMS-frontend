
import { createMuiTheme } from '@material-ui/core/styles'

const previewModeRichTextTheme = createMuiTheme()

Object.assign(previewModeRichTextTheme, {
    overrides: {
        MUIRichTextEditor: {
            root: {
                marginTop: 20,
                marginBottom: 20,
                width: "100%"
            }
        }
    }
});

export default previewModeRichTextTheme;