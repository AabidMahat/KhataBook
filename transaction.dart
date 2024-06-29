import 'dart:io';
import 'package:intl/intl.dart';
import 'package:pdf/pdf.dart';
import 'package:pdf/widgets.dart' as pw;
import 'package:open_file/open_file.dart';
import 'package:path_provider/path_provider.dart';

Future<void> generatePdf(
    List<TransactionData> transactions, List<Student> students) async {
  final pdf = pw.Document();

  // Calculating Total Credit, Paid Fees, and Pending Fees
  double totalCredit = transactions
      .where((txn) => txn.transactionType == 'payment')
      .fold(0, (sum, txn) => sum + txn.amount);
  double totalDebit = transactions
      .where((txn) => txn.transactionType == 'charge')
      .fold(0, (sum, txn) => sum + txn.amount);
  double pendingFees = totalDebit - totalCredit;

  pdf.addPage(
    pw.Page(
      build: (pw.Context context) => pw.Column(
        crossAxisAlignment: pw.CrossAxisAlignment.start,
        children: [
          pw.Header(
            level: 0,
            child: pw.Text('Transaction Report'),
          ),
          pw.Row(
            mainAxisAlignment: pw.MainAxisAlignment.spaceBetween,
            children: [
              pw.Text('Total Credit: $totalCredit'),
              pw.Text('Total Debit: $totalDebit'),
              pw.Text('Pending Fees: $pendingFees'),
            ],
          ),
          pw.SizedBox(height: 20),
          pw.Table.fromTextArray(
            border: pw.TableBorder.all(),
            headerAlignment: pw.Alignment.centerLeft,
            headerDecoration: pw.BoxDecoration(color: PdfColors.grey300),
            cellAlignment: pw.Alignment.centerLeft,
            cellPadding: const pw.EdgeInsets.all(8),
            headerHeight: 25,
            headers: ['Date', 'Student Name', 'Transaction Type', 'Amount'],
            data: List<List<String>>.generate(
              transactions.length,
              (index) {
                final txn = transactions[index];
                final student = students.firstWhere(
                  (student) => student.id == txn.studentId,
                  orElse: () => Student(
                    id: "",
                    studentName: "Unknown",
                    phone: "phone",
                    classes: "classes",
                    totalFees: 0,
                    paidFees: 0,
                    accountId: "accountId",
                  ),
                );
                final transactionType = txn.transactionType;
                final amount = txn.amount.toString();
                final date = DateFormat('yyyy-MM-dd').format(txn.createdAt);

                return [date, student.studentName, transactionType, amount];
              },
            ),
            cellDecoration: (int rowIndex, dynamic cellValue, int columnIndex) {
              final transactionType = transactions[rowIndex].transactionType;
              if (transactionType == 'charge') {
                return pw.BoxDecoration(color: PdfColors.red50);
              } else if (transactionType == 'payment') {
                return pw.BoxDecoration(color: PdfColors.green50);
              }
              return pw.BoxDecoration(); // Return default decoration for other columns
            },
          ),
        ],
      ),
    ),
  );

  // Get the document directory using path_provider
  final directory = await getApplicationDocumentsDirectory();
  final path = directory.path;

  // Save the PDF file
  final file = File('$path/transaction_report.pdf');
  await file.writeAsBytes(await pdf.save());

  // Open the generated PDF using open_file package
  OpenFile.open('$path/transaction_report.pdf');
}
