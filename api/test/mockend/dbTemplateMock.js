exports.getTemplates = () => {
  return (req, res) => {
    console.log('req.params', req.query)

    if (req.query.environmentClass === 'u') {
      res.status(400).send('No template available for envclass u')
    } else {
      res.status(200).send([
        {
          uri: '/em/cloud/dbaas/pluggabledbplatformtemplate/24',
          description:
            'Standard Production Oracle Pluggable Database, Oracle Dataguard, Backup enabled',
          name: 'p_st_rhel_fss'
        }
      ])
    }
  }
}
