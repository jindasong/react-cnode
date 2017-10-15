class Utils {
  static delHtmlTag (str = '') {
    return str.replace(/<[^>]+>/g, '');
  }
}

export default Utils;