""" Archival views
"""

from Products.ATVocabularyManager.namedvocabulary import NamedVocabulary
from Products.Five import BrowserView
from eea.workflow.interfaces import IObjectArchivator


class Reasons(BrowserView):
    """ Returns a dict of reasons
    """

    def __call__(self):
        rv = NamedVocabulary('eea.workflow.reasons')
        reasons = rv.getVocabularyDict(self.context)
        return reasons


class ArchiveContent(BrowserView):
    """ Archive the context object
    """

    def __call__(self, **kwargs):
        form = self.request.form
        values = {'initiator':      form.get('workflow_archive_initiator'),
                  'custom_message': 
                    form.get('workflow_other_reason', '').strip(),
                  'reason':         form.get('workflow_reasons_radio', 'other')
                  }
        storage = IObjectArchivator(self.context)
        storage.archive(context=self.context, **values)
        return "OK"


class ArchiveStatus(BrowserView):
    """ Show the same info as the archive status viewlet
    """

    @property
    def info(self):
        """ Info used in view
        """
        info = IObjectArchivator(self.context)

        rv = NamedVocabulary('eea.workflow.reasons')
        vocab = rv.getVocabularyDict(self.context)

        archive_info = dict(initiator=info.initiator,
                            archive_date=info.archive_date,
                            reason=vocab.get(info.reason, "Other"),
                            custom_message=info.custom_message)

        return archive_info

